import React from 'react'
import UrlForm from '../components/UrlForm.jsx';
import Footer from '../components/Footer.jsx';
import UserUrls from '../components/UserUrls.jsx';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
     <UrlForm />
     <UserUrls />
     <Footer />
      </div>
  )
}

export default DashboardPage 