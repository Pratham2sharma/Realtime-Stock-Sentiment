import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChartCandlestick, ChartNoAxesCombined, Info } from 'lucide-react'

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HomePage = () => {
    return (
        <div className='relative min-h-screen text-white overflow-hidden'>
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">

                {/* Left Column: Heading & Slogan */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            Real-Time Indian Stock Sentiment
                        </h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Track the market mood instantly with API-powered sentiment analysis from live stock data and news.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700 hover:bg-sky-600 duration-150 text-white font-semibold py-3 px-6 rounded-lg shadow"
                        >

                            <Link to="/stock">Get Started</Link>

                        </motion.button>
                    </div>
                </motion.div>
                {/* Right Column: Image */}
                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/stock.svg"
                            alt="Stock sentiment illustration"
                            className="w-full max-w-md"
                        />
                    </motion.div>
                </div>

            </div>

            <section className=" py-12">
                <div className="container  mx-auto p-4 md:p-6 lg:p-8">
                    <motion.h2
                        className="text-3xl text-center font-bold mb-4"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        Unlock Insights into the Indian Stock Market
                    </motion.h2>

                    <motion.p
                        className="text-lg text-center leading-relaxed mb-4"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: 0.2 }}
                    >
                        Our platform provides real-time sentiment analysis and insightful details about individual stocks, helping you make informed investment decisions.
                    </motion.p>
                    <div className="flex flex-wrap justify-center mb-4">
                        {[ // simplified for reusability
                            {
                                icon: <ChartNoAxesCombined />,
                                title: "Sentiment Analysis",
                                desc: "Our proprietary algorithm analyzes news articles, social media posts, and other market-related data to provide a sentiment score for each stock."
                            },
                            {
                                icon: <ChartCandlestick />,
                                title: "Insightful Details",
                                desc: "Get access to detailed information about each stock, including financials, news, and trends, to help you make informed investment decisions."
                            },
                            {
                                icon: <Info />,
                                title: "Real-time Updates",
                                desc: "Stay up-to-date with real-time updates on market trends, news, and sentiment analysis to help you stay ahead of the curve."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.1 * idx }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="bg-gray-800 rounded shadow hover:shadow-lg p-4 h-full">
                                    {item.icon}
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-lg leading-relaxed mb-2">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="flex justify-center mb-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={fadeInUp}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button
                            className="bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700 hover:bg-sky-600 duration-150 text-white font-bold py-2 px-4 rounded"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/stock"> Explore Stocks Now </Link>
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
