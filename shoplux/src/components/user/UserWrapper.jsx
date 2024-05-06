import React, { Fragment } from 'react'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import Cart from '../../Pages/user/Cart'
import LoginForm from '../../Pages/user/LoginForm'
import SignUpForm from '../../Pages/user/SignUpForm'
import UserHome from '../../Pages/user/UserHome'
import {Routes,Route} from 'react-router-dom'

function UserWrapper() {
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
