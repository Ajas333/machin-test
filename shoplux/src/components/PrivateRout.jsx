import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthUser from '../Utils/isAuthUser';

function PrivateRoute({ children }) {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        const authInfo = await isAuthUser();
        setIsAuthenticated(authInfo.isAuthenticated);
        setLoading(false);
      };
  
      fetchData();
    }, []);
  
    if (isLoading) {
      
      return <div>Loading...</div>;
    }
  
    if (!isAuthenticated) {
      
      return <Navigate to="/user_login" />;
    }
  
    
    return children;
  }
  
  
  export default PrivateRoute;