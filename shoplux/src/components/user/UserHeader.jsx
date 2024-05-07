import React from 'react'
import './main.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import { useSelector,useDispatch } from 'react-redux';
import 'flowbite'


function UserHeader() {

  const [cartCount, setCartCount] = useState(0);
  const authentication_user=useSelector((state) => state.authentication_user);
 
  console.log("user basic details..............",authentication_user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = ()=>{
    localStorage.clear();
    dispatch(
      set_Authentication({
        name:null,
        isAuthenticated:false,
        isAdmin: false
      })
    );
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 shadow-md bg-white">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Shoplux Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-gray-800">Shoplux</h1>
      </div>
      <nav className="hidden md:flex space-x-8 text-gray-700">
        <Link to={'/shop'} className="hover:text-red-500">Shop</Link>  {/* Use Link for navigation within React */}
        <Link to={'/men'} className="hover:text-red-500">Men</Link>
        <Link to={'/women'} className="hover:text-red-500">Women</Link>
        <Link to={'/kids'} className="hover:text-red-500">Kids</Link>
      </nav>
      <div className="flex items-center gap-4">
        {authentication_user.isAuthenticated ? 
        ( <div>
          {authentication_user.username}
          <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none">
          Logout
        </button> 
     
        </div> ) : (
        <Link to={'/user_login'}>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none">
            Login
          </button>
        </Link>
        )}
        
      </div>
    </header>
  )
}

export default UserHeader
