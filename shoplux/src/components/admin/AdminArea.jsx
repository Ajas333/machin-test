import React,{useEffect} from 'react'
import { Route,Routes } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice'
import axios from 'axios'
import isAuthAdmin from '../../Utils/isAuthAdmin'
import AdminHome from '../../Pages/admin/AdminHome'
import Login from '../../Pages/admin/Login'
import Header from './Header'
import Footer from './Footer'
import AdminPrivateRoute from '../AdminPrivateRout'



function AdminArea() {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);

  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      if (isAuthenticated.isAuthenticated) {
        const res = await axios.get(baseURL + "/api/account/user/details/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log('the user response is', res);

      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
    <Header/>
      <Routes>
        <Route path='/' element={<AdminPrivateRoute><AdminHome/></AdminPrivateRoute>}></Route>
        <Route path='/admin_login' element={<Login/>} ></Route>
      </Routes>
    <Footer/>
    </div>
  )
}

export default AdminArea
