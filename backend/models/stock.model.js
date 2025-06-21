// models/stock.model.js
import mongoose from "mongoose";

const SentimentSchema = new mongoose.Schema({
  positive: { type: Number, required: true, default: 0 },
  negative: { type: Number, required: true, default: 0 },
  neutral: { type: Number, required: true, default: 0 },
  overall: {
    type: String,
    enum: ["positive", "negative", "neutral"],
    required: true,
    default: "neutral"
  }
}, { _id: false });

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, uppercase: true },
  lastPrice: { type: Number, required: true },
  sentiment: { type: SentimentSchema, required: true },
  fetchedAt: { type: Date, default: Date.now }
});

const Stock = mongoose.model("Stock", StockSchema);
export default Stock;
