import React, { useEffect } from 'react'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import Cart from '../../Pages/user/Cart'
import LoginForm from '../../Pages/user/LoginForm'
import SignUpForm from '../../Pages/user/SignUpForm'
import UserHome from '../../Pages/user/UserHome'
import {Routes,Route} from 'react-router-dom'

import isAuthUser from '../../Utils/isAuthUser'
import { useSelector,useDispatch } from 'react-redux'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice'
import axios from 'axios'

function UserWrapper() {

  const dispatch =useDispatch();
  const authentication_user=useSelector(state=>state.authentication_user)
  const checkAuth = async () =>{
  const isAuthenticated = await isAuthUser();

    dispatch(
      set_Authentication({
        username:isAuthenticated.username,
        isAuthenticated:isAuthenticated.isAuthenticated
      })
    );
  }

  const baseURL = 'http://127.0.0.1:8000';
  const token = localStorage.getItem('access');

  const fetchUserData = async () =>{
    try{
      const result = await axios.get(baseURL+'/api/account/user/details/',{headers: {
        'authorization': `Bearer ${token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }})
      .then(result => {
          
          dispatch(
            set_user_basic_details({
              name : result.data.username,
              email : result.data.email
            })
          );
        })
  }
  catch (error) {
    console.log(error);
    
  }

};

useEffect(() => {
  if(!authentication_user.username)
    {
      checkAuth();
    }
  if(authentication_user.isAuthenticated)
    {
      fetchUserData();
    }

}, [authentication_user])

  return (
    <>
        <UserHeader/>
        <div>
            <Routes>
              <Route path='/' element={<UserHome/>}></Route>
              <Route path='/user_login' element={<LoginForm/>}></Route>
              <Route path='/user_signup' element={<SignUpForm/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
            </Routes>
        </div>
        <UserFooter/>
    </>
  )
}

export default UserWrapper
