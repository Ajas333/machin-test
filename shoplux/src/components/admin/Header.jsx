import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';

function Header() {
  const authentication_user=useSelector((state) => state.authentication_user);
  const dispatch = useDispatch();
  console.log(authentication_user.username)
  const handleLogout = ()=>{
    localStorage.clear();
    dispatch(
      set_Authentication({
        name:null,
        isAuthenticated:false,
        isAdmin: false
      })
    );
    navigate("/admincontrol/admin_login");
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 shadow-md bg-white">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Shoplux Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-gray-800">Shoplux</h1>
      </div>
      
      <div className="flex items-center gap-4">
      {authentication_user.isAuthenticated ? 
        ( <div>
          {authentication_user.username}
          <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none">
          Logout
        </button> 
     
        </div> ) : (
        ""
        )}
      </div>
    </header>
  )
}

export default Header
