import React from 'react'
import { FaLink, FaRegCopy, FaCheckCircle, FaGithub, FaRocket, FaMagic } from 'react-icons/fa';


const Footer = () => {
  return (
    <>
         <footer className="mt-12 mb-4 text-black-900 text-sm text-center select-none flex items-center justify-center gap-2 relative z-10">
        <span className='text-lg'>Made with</span>
        <span className="text-pink-500 animate-pulse text-lg">♥</span>
        <span className='text-lg'>by</span>
        <span className="font-bold text-zinc-700 text-lg">RG</span>
        <a 
          href="https://github.com/Rudra-744" 
          className="ml-2 hover:text-zinc-600 transition-colors duration-300" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGithub className="inline text-3xl " />
        </a>
      </footer> 
    </>
  )
}

export default Footer