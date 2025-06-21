import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, ResponsiveContainer
} from "recharts";
import useHistoryStore from '../store/useHistoryStore';
import { useState } from 'react';
import { motion } from 'framer-motion';

const StockHistory = () => {
    const [symbolInput, setSymbolInput] = useState("");
    const {symbol, loading, error, fetchHistory, historyData } = useHistoryStore();

    const handleFetch = () => {
        if (symbolInput.trim()) {
            fetchHistory(symbolInput.trim().toUpperCase());
        }
    };

    const formattedData = historyData.map(item => ({
        symbol: item.symbol,
        date: new Date(item.fetchedAt).toLocaleDateString(),
        price: item.lastPrice,
        positive: item.sentiment?.positive || 0,
        negative: item.sentiment?.negative || 0,
        neutral: item.sentiment?.neutral || 0,
    }));

    return (
        <div className="p-6 w-full max-w-5xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}  // Start slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate to original position
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }} // only animate once per scroll
                className="flex items-center justify-center gap-4"
            >

                <input
                    type="text"
                    placeholder="Enter Stock Symbol"
                    value={symbolInput}
                    onChange={(e) => setSymbolInput(e.target.value)}
                    className="px-4 py-2 border rounded w-64 text-black"
                />
                <button
                    onClick={handleFetch}
                    className="bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700 hover:bg-sky-600 duration-150 text-white px-4 py-2 rounded"
                >
                    Fetch History
                </button>
            </motion.div>

            {loading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {formattedData.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold">Price Trend for {formattedData[0].symbol}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                    <h2 className="text-xl font-semibold mt-8">Sentiment Comparison</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="positive" stackId="a" fill="#22c55e" />
                            <Bar dataKey="neutral" stackId="a" fill="#a3a3a3" />
                            <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    )
}

export default StockHistory
