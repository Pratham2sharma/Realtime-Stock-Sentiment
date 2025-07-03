import React from 'react'
import useStockStore from '../store/useStockStore';
import { useEffect } from 'react';


const StockInfo = () => {

     const {
    symbol,
    stockData,
    loading,
    error,
    setSymbol,
    fetchStockData,
  } = useStockStore();

  // Fetch on mount and every 3 minutes
  useEffect(() => {
    if (!symbol) return;

    

    // Set interval for every 3 minutes
    const intervalId = setInterval(() => {
      fetchStockData();
    }, 3 * 60 * 1000); // 3 minutes in milliseconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [symbol]);

  const handleSearch = () => {
    if (!symbol.trim()) return;
    fetchStockData(); // fresh=false
  };
   return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 border-gray-700 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">📈 Stock Sentiment Checker</h2>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter NSE symbol (e.g., INFY)"
          className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700 hover:bg-sky-600 duration-150 text-white px-5 py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-3">{error}</p>
      )}

      {stockData && (
        <div className="bg-gray-600 p-5 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">{stockData.symbol} — Current Price ₹{stockData.lastPrice}</h3>
          <p className="mb-2">
            <span className="font-medium">Overall Sentiment:</span>{" "}
            <span className={`capitalize font-bold ${
              stockData.sentiment.overall === "positive"
                ? "text-green-600"
                : stockData.sentiment.overall === "negative"
                ? "text-red-600"
                : "text-white-600"
                
            }`}>
              {stockData.sentiment.overall}
            </span>
          </p>
          <ul className="list-disc list-inside text-sm">
            <li>Positive: {stockData.sentiment.positive}</li>
            <li>Negative: {stockData.sentiment.negative}</li>
            <li>Neutral: {stockData.sentiment.neutral}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockInfo;
