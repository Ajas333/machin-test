import React,{useEffect,useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSelector,useDispatch } from 'react-redux'
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice';
import {jwtDecode} from 'jwt-decode'

function LoginForm() {
  
  const [message, setMessage] = useState(null);
  const [values,setValues] = useState({
    username:"",
    password:""
  })
  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = 'http://127.0.0.1:8000/';
  const authentication_user = useSelector(state=> state.authentication_user)  
 
  useEffect(()=>{
    if(authentication_user.isAuthenticated){
      navigate('/')
    }
  },[authentication_user.isAuthenticated])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values, 
      [name]: value 
    });
    console.log(values)
  };

  const handleLoginSubmit = async(event)=>{
    event.preventDefault();
    setFormError([])
    const formData = new FormData();
    formData.append("username",event.target.username.value);
    formData.append("password",event.target.password.value);
    console.log("stage two get login data......",formData)

    try{
      const result = await axios.post(baseURL+'api/account/login/',formData);
      console.log("response............",result)
      if (result.status === 200){
        localStorage.setItem('access',result.data.access)
        localStorage.setItem('refresh',result.data.refresh)
        console.log("login successfull....",result.data)
        dispatch(
          set_Authentication({
            username: jwtDecode(result.data.access).username,
            isAuthenticated: true,
            isAdmin:result.data.isAdmin
          })
        );
        navigate('/')
        return result
      }
    }
    catch(error){
      console.log(error)
      if (error.response.status===401)
      {
       
        setFormError(error.response.data)
      }
      else
      {
        console.log(error);
  
      }
    }

  }



  return (

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
          Or
          <Link to={'/user_signup'}>
          <a href="#"
            className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            create a new acccount
          </a>
                </Link>
        </p>
      </div>
      
      <div className = "mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLoginSubmit} method='POST'>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input id="username" name="username" placeholder="" type="text" required="" value={values.username} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="password" name="password" type="password" required="" values={values.password} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
              </div>
              
              <div className="text-sm leading-5">
                <a href="#"
                  className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Forgot your password?
                </a>
              </div>
            </div>
               
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Sign in
                </button>
              </span>
              <ul className='text-danger'>
             {formError['detail'] && <li>
             {formError['detail']}
              </li>}
            </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
