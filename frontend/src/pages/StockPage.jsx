import React from 'react'
import StockInfo from '../components/StockInfo'
import { motion } from 'framer-motion'
import StockHistory from '../components/StockHistory'
import { TriangleAlert } from 'lucide-react'


const StockPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 px-4 py-10">
            
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">


                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/sentiment.svg"
                            alt="Stock sentiment illustration"
                            className="w-full max-w-md"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <StockInfo />
                </motion.div>
            </div>

            <h1 className="text-4xl text-center font-bold text-white mb-8">Stock Sentiment History Analysis</h1>
            <div className='mt-10 justify-center items-center flex'>
                
                <StockHistory />
            </div>

            <div className='flex items-center justify-center'>
                <TriangleAlert className=' h-7 w-7 mr-2' aria-hidden='true' /> <h2 className="text-2xl text-center font-bold "> Disclaimer</h2>
            </div>
            <p className="text-lg ml-[25%] mt-2 items-center lg:text-center w-1/2 leading-relaxed mb-4 sm:text-center sm:w-1/2">
                The stock data and sentiment analysis displayed on this platform are intended for educational and informational purposes only. While we strive to provide accurate and up-to-date information, the data may be incomplete, delayed, or incorrect due to third-party API limitations, rate limits, or potential malfunctions. This content should not be considered financial advice, and we recommend consulting with a qualified financial advisor before making any investment decisions.
            </p>

        </div>


    )
}

export default StockPage
