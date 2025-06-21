import React from 'react'
import { motion } from 'framer-motion'
import { CircleArrowRight, TriangleAlert } from 'lucide-react'

const AboutPage = () => {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h1 className="text-3xl font-bold mb-4">About Us</h1>
                        <p className="text-lg text-justify leading-relaxed mb-4">
                            Welcome to StockSentiment, your go-to destination for real-time Indian stock market sentiment analysis. Our mission is to empower investors and traders with actionable insights, helping them make informed decisions in the ever-changing market landscape.
                        </p>
                        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                        <p className="text-lg text-justify leading-relaxed mb-4">
                            Founded by a passionate developer with a deep interest in the stock market, StockSentiment is dedicated to bridging the gap between real-time market data and meaningful investor insights. Our platform harnesses the power of natural language processing, third-party APIs, and advanced data visualization to deliver a comprehensive and intuitive view of market sentiment.
                        </p>
                        <div className='flex'>
                            <TriangleAlert className='mt-1 h-7 w-7 mr-2' aria-hidden='true'/> <h2 className="text-2xl font-bold mb-4"> Disclaimer</h2>
                        </div>
                        <p className="text-lg text-justify leading-relaxed mb-4">
                            The stock data and sentiment analysis displayed on this platform are intended for educational and informational purposes only. While we strive to provide accurate and up-to-date information, the data may be incomplete, delayed, or incorrect due to third-party API limitations, rate limits, or potential malfunctions. This content should not be considered financial advice, and we recommend consulting with a qualified financial advisor before making any investment decisions.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">How it Works</h2>
                        <ul className="list-none mb-4">
                            <li className="text-lg text-justify leading-relaxed mb-2 flex">
                                <CircleArrowRight className='h-7 w-7 mr-2' aria-hidden='true' />
                                We aggregate news articles, social media posts, and other market-related data from reputable sources.
                            </li>
                            <li className="text-lg text-justify leading-relaxed mb-2 flex">
                                <CircleArrowRight className='h-7 w-7 mr-2' aria-hidden='true' />
                                Our proprietary algorithms analyze the data to extract sentiment scores, trends, and insights.
                            </li>
                            <li className="text-lg text-justify leading-relaxed mb-2 flex">
                                <CircleArrowRight className='h-9 w-9 mr-2' aria-hidden='true' />
                                Our platform visualizes the data in real-time, providing users with a clear and actionable understanding of market sentiment.
                            </li>
                        </ul>
                    </div>
                </motion.div>
                <div className='flex justify-center'>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/about.svg"
                            alt="About sentiment illustration"
                            className="w-full max-w-md"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
