// models/stockHistory.model.js
import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema({
    symbol: String,
    lastPrice: Number,
    sentiment: {
        positive: Number,
        negative: Number,
        neutral: Number,
        overall: String,
    },
    fetchedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("StockHistory", stockHistorySchema);


