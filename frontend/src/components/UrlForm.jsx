import React from "react";
import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createShortUrl(url, customSlug);
      setShortUrl(result);
      // Invalidate the 'urls' query to refetch the list
      await queryClient.invalidateQueries({ queryKey: ['urls'] });
      setError(null);
      // Clear the form
      setCustomSlug('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || error.message || 'Something went wrong');
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  
  

  return ( 
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-lg border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Link Shortener
          </h2>
          <p className="text-gray-500 text-sm">Transform long URLs into clean, shareable links</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter your URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <input
                type="url"
                id="url"
                value={url}
                onInput={(event)=>setUrl(event.target.value)}
                placeholder="https://example.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Shorten URL
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
           {/* {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {isAuthenticated && (
            <div className="mt-4">
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                Custom URL (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(event) => setCustomSlug(event.target.value)}
                placeholder="Enter custom slug"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}  */}

          {isAuthenticated && (
            <div className="mt-4">
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                Custom URL (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(event) => setCustomSlug(event.target.value)}
                placeholder="example"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
            
          
          {shortUrl && (
            <div className="mt-8 p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Your shortened URL:</h2>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={shortUrl}
                  className="flex-1 p-3 bg-white/70 border-2 border-green-200/50 rounded-xl text-sm font-mono text-gray-700 focus:outline-none"
                />
                 <button
                  onClick={handleCopy}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    copied 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'bg-white/70 text-gray-700 hover:bg-white border-2 border-green-200/50'
                  }`}
                >
                  {copied ? (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Copied!
                    </div>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  
    </>
  );
};

export default UrlForm;