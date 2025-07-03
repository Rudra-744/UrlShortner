import React from 'react'
import { FaLink, FaRegCopy, FaCheckCircle, FaGithub, FaRocket, FaMagic } from 'react-icons/fa';


const Footer = () => {
  return (
    <>
         <footer className="mt-12 mb-4 text-gray-500 text-sm text-center select-none flex items-center justify-center gap-2 relative z-10">
        <span>Made with</span>
        <span className="text-pink-500 animate-pulse">♥</span>
        <span>by</span>
        <span className="font-bold text-purple-700">YourName</span>
        <a 
          href="https://github.com/yourgithub" 
          className="ml-2 hover:text-purple-600 transition-colors duration-300" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGithub className="inline text-xl" />
        </a>
      </footer> 
    </>
  )
}

export default Footer