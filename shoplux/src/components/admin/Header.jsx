import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 shadow-md bg-white">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Shoplux Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-gray-800">Shoplux</h1>
      </div>
      
      <div className="flex items-center gap-4">
      </div>
    </header>
  )
}

export default Header
