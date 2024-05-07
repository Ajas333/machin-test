import { jwtDecode } from "jwt-decode";
import axios from "axios";

const   updateUserToken = async ()=>{
    const refreshToken = localStorage.getItem("refresh");
    const baseURL='http://127.0.0.1:8000'

    try {
        const result = await axios.post(baseURL+'/api/account/token/refresh/', 
        {
            'refresh':refreshToken
        })
        if(result.status === 200){
          localStorage.setItem('access', result.data.access)
          localStorage.setItem('refresh', result.data.refresh)
          let decoded = jwtDecode(result.data.access);
          return {'name':decoded.username,isAuthenticated:true}
        }
        else
        {
            return {'username':null,isAuthenticated:false}
        }  
        
      }
      catch (error) {
         return {'username':null,isAuthenticated:false}
      }
}

const isAuthUser = async () => {

    const accessToken = localStorage.getItem("access");
   
    if(!accessToken)
    {
        return {'username':null,isAuthenticated:false}
    }
    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);
    if (decoded.exp > currentTime) {
        return {'username':decoded.username,isAuthenticated:true}
      } else {
        const updateSuccess = await updateUserToken();
        return updateSuccess;
      }

}
export default isAuthUser ;