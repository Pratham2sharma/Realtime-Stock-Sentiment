import { CodeXml, Github, Instagram, Linkedin } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className=" py-4">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                    <a href="https://www.linkedin.com/in/pratham-sharma-646045231" target="_blank" rel="noopener noreferrer">
                        <Linkedin />
                    </a>
                    <a href="https://github.com/Pratham2sharma" target="_blank" rel="noopener noreferrer">
                        <Github />
                    </a>
                    <a href="https://www.instagram.com/pratham2sharma" target="_blank" rel="noopener noreferrer">
                        <Instagram />
                    </a>
                </div>
                <p className="text-lg leading-relaxed text-center mb-2">
                    &copy; 2023 Pratham Sharma. All rights reserved.
                </p>
                <p className="text-lg leading-relaxed text-center ">
                    Built with love by Pratham Sharma 
                </p>
            </div>
        </footer>
    )
}

export default Footer
