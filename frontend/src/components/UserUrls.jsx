import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUrls } from '../api/user.api'

const UserUrls =  () => {
    const { data: urls, isLoading, error } = useQuery({
        queryKey: ["urls"],
        queryFn: () => getAllUrls(),
        refetchInterval: 3000,
        staleTime: 0,
    })
    
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        let timeoutId;
        if (copiedId) {
            timeoutId = setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        }
        return () => clearTimeout(timeoutId);
    }, [copiedId]);

    const handleCopy = ({ url, id }) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
    }
    
if(isLoading){
    return (
        <div className='flex justify-center my-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600'></div>
        </div>
    )
}
if(error){
    return (
        <div className='flex justify-center my-8'>
            <div className='text-red-500'>Error loading your URLs: {error.message}</div>
        </div>
    )
}
if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-12">
        {/* Lightning Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
  
        <h3 className="text-lg font-semibold text-gray-700">No URLs found</h3>
        <p className="text-sm text-gray-500">
          You haven't created any shortened URLs yet.
        </p>
      </div>
    );
  }
  
return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Your Shortened URLs</h2>
        <p className="text-gray-600">Manage and track your links</p>
      </div>
      
      <div className="space-y-6">
        {urls.urls.reverse().map((url) => (
          <div
            key={url._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Original URL</p>
                  <a
                    href={url.full_Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-base break-all font-medium"
                  >
                    {url.full_Url}
                  </a>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Short URL</p>
                    <a
                      href={`http://localhost:3000/${url.short_Url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-base break-all font-medium"
                    >
                      {`http://localhost:3000/${url.short_Url}`}
                    </a>
                  </div>
                  
                  <button
                    onClick={() => handleCopy({ url: `http://localhost:3000/${url.short_Url}`, id: url._id })}
                    className={`mt-2 sm:mt-0 px-5 py-2.5 rounded-lg text-white font-medium text-sm tracking-wide transition-all duration-200 flex-shrink-0 ${
                      copiedId === url._id
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                  >
                    {copiedId === url._id ? (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default UserUrls