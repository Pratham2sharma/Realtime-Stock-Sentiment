import axios from "axios";
import dotenv from "dotenv";
import client from "../lib/redis.js";
import validSymbols from "../utils/validSymbols.js";
import Stock from "../models/stock.model.js";
import StockHistory from "../models/stockHistory.model.js";
import { enhanceSentiment } from "../utils/enhanceSentiment.js";


dotenv.config();

const ALPHA_SECRET_API_KEY = process.env.ALPHA_API_KEY;
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

export const getStock = async (req, res) => {
    const inputSymbol = req.params.symbol.toUpperCase();
    const symbol = `${inputSymbol}.BSE`;
    const cacheKey = `stock-${symbol}`;
    const forceFresh = req.query.fresh === "true";

    console.log(`\n[START] Processing ${symbol}`);

    if (!validSymbols.has(inputSymbol)) {
        console.log(`[INVALID SYMBOL] ${inputSymbol}`);
        return res.status(400).json({ error: "Invalid NSE/BSE stock symbol" });
    }

    let isFresh = true;

    try {
        // 1. Redis Cache
        let cachedData = null;
        if (!forceFresh) {
            try {
                const cached = await client.get(cacheKey);
                if (cached) {
                    console.log(`[CACHE HIT] ${symbol}`);
                    cachedData = JSON.parse(cached);
                    isFresh = false;
                }
            } catch (err) {
                console.error(`[REDIS ERROR] ${symbol}:`, err.message);
            }
        }

        // 2. Fetch Price (only if fresh)
        let lastPrice = cachedData?.lastPrice || null;
        if (isFresh) {
            try {
                const alphaUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_SECRET_API_KEY}`;
                const priceRes = await axios.get(alphaUrl);
                const quote = priceRes.data?.["Global Quote"];
                if (!quote || !quote["05. price"]) throw new Error("Invalid price data");
                lastPrice = parseFloat(quote["05. price"]);
                console.log(`[ALPHA VANTAGE] ₹${lastPrice}`);
            } catch (err) {
                console.error(`[ALPHA ERROR] ${symbol}:`, err.message);
                return res.status(500).json({ error: "Failed to fetch price" });
            }
        }

        // 3. Fetch News + Sentiment (only if fresh)
        let sentiment = cachedData?.sentiment || { positive: 0, negative: 0, neutral: 0, overall: "neutral" };

        if (isFresh) {
            try {
                const query = encodeURIComponent(`${inputSymbol} stock OR ${inputSymbol} share`);
                const newsUrl = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=${query}&language=en&country=in&category=business`;

                const newsRes = await axios.get(newsUrl);
                const articles = newsRes.data?.results || [];
                console.log(`[NEWS ARTICLES] Found ${articles.length} articles for ${inputSymbol}`);



                sentiment = enhanceSentiment(articles); //  USE ENHANCEMENT HERE



                console.log(`[ENHANCED SENTIMENT]`, sentiment);
            } catch (err) {
                console.warn(`[SENTIMENT ERROR] ${symbol}:`, err.message);
            }
        }

        // 4. Final response object
        const stockData = {
            symbol: inputSymbol,
            lastPrice,
            sentiment,
            fetchedAt: new Date(),
        };

        console.log(`[STOCK DATA GENERATED]`, stockData);

        // 5. Cache fresh data
        if (isFresh) {
            try {
                await client.set(cacheKey, JSON.stringify(stockData), "EX", 10);
                console.log(`[REDIS] Cached ${symbol}`);
            } catch (err) {
                console.error(`[REDIS SET ERROR] ${symbol}:`, err.message);
            }
        }

        // 6. Save to Stock 
        try {
            await Stock.findOneAndUpdate(
                { symbol: inputSymbol },
                stockData,
                { upsert: true, new: true }
            );
            console.log(`[MONGO] Updated latest snapshot`);
        } catch (err) {
            console.error(`[MONGO STOCK ERROR]`, err.message);
        }

        // 7. Save to StockHistory (only if fresh)
        if (isFresh) {
            try {
                await StockHistory.create({
                    ...stockData,
                    fetchedAt: new Date(),
                });
                console.log(`[MONGO] Historical entry logged`);
            } catch (err) {
                console.error(`[MONGO HISTORY ERROR]`, err.message);
            }
        }

        // 8. Send to frontend
        res.json(stockData);
    } catch (err) {
        console.error(`[UNCAUGHT ERROR] ${symbol}:`, err.message);
        res.status(500).json({ error: "Error in getStock Controller" });
    }
};


export const getStockHistory = async (req, res) => {
    const inputSymbol = req.params.symbol.toUpperCase();
    console.log(`[HISTORY REQUEST] Symbol: ${inputSymbol}`);


    // Validate symbol
    if (!validSymbols.has(inputSymbol)) {
        return res.status(400).json({ error: "Invalid NSE/BSE stock symbol" });
    }

    try {
        const history = await StockHistory.find({symbol: inputSymbol})
         .sort({fetchedAt: 1}) //oldest to newest
         .limit(100); // limit to last 100 entries

        if(!history || history.length === 0){
            console.log(`[HISTORY NOT FOUND] No History for ${inputSymbol} currently`);
            return res.status(404).json({error: "No History found for this Stock Symbol , Please Try Again Later"});
        }  

        res.json({history});
        
    } catch (err) {
        console.error(`[MONGO HISTORY FETCH ERROR] ${inputSymbol}:` , err.message);
        return res.status(500).json({error: "Error in getStockHistory Controller"});
    }
}

