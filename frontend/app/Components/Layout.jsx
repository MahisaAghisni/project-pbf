import {React, useState} from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children}) => {
  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      <Sidebar mobileNavsidebar={mobileNavsidebar} />

      <div className="flex-grow text-gray-800">
        <Header mobileNavsidebar={mobileNavsidebar} setMobileNavsidebar={setMobileNavsidebar} />
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout