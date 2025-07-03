import React from 'react'
import UrlForm from '../components/UrlForm.jsx';
import Footer from '../components/Footer.jsx';


const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
     <UrlForm />
     <Footer />
      </div>
  )
}

export default HomePage 