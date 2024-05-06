import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

function SignUpForm() {

    const [formError, setFormError] = useState([]);
    const [values, setValues] = useState({
        full_name:"",
        email:"",
        password:"",
        confirm_password:"",
    })
    const navigate = useNavigate();
    const baseURL = ' http://127.0.0.1:8000';

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
          ...values, 
          [name]: value 
        });
        console.log(values)
      };
    
    const handleFormSubmit = async (event)=>{
        event.preventDefault();

        if(values.password !== values.confirm_password){
            setFormError("passwords do not match");
            return;
        }
        setFormError('');
        const formData = new FormData();
        formData.append("username",event.target.full_name.value);
        formData.append("email",event.target.email.value);
        formData.append("password",event.target.password.value);
        formData.append("conform_password",event.target.confirm_password.value);
        console.log("signup form data",formData)

        try{
            const result = await axios.post(baseURL+'/api/account/register/',formData)
            console.log("ststus error......",result.status)
            if(result.status === 201){
                navigate('/user_login',{
                    state:result.data.Message
                })
                return result
            }
        }
        catch(error){
            if (error.response.status === 406)
                {
                    console.log(error);
                    console.log(error.response.data);
                    setFormError(error.response.data);
                }
            else
            {
                console.log(error)
            }
        }
    }


    return (
    
    <div class="bg-grey-lighter min-h-screen flex flex-col my-14">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                        <form onSubmit={handleFormSubmit} method='POST' >
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="full_name"
                                value={values.full_name}
                                placeholder="Full Name" onChange={handleInputChange} />
                                
        
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                value={values.email}
                                placeholder="Email" onChange={handleInputChange}/>
        
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                value={values.password}
                                placeholder="Password" onChange={handleInputChange}/>
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                value={values.confirm_password}
                                placeholder="Confirm Password" onChange={handleInputChange}/>
                            {formError && <p style={{ color: 'red'}} >{formError} </p>}
                            <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Account</button>
                        </form>
                        <div class="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the 
                            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and 
                            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
    
                    <div class="text-grey-dark mt-6">
                        Already have an account? 
                        <a class="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
  );
}

export default SignUpForm;
