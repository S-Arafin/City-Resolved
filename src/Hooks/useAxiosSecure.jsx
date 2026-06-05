import axios from "axios";
import { useNavigate } from "react-router"; 
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../Firebase/Firebase.init";

// 1. Strictly Production URL
// This will ALWAYS call your Vercel server, even when you run npm run dev locally.
const axiosSecure = axios.create({
  baseURL: "https://city-resolved-backend.vercel.app", 
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 

  useEffect(() => {
    
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async function (config) {
        // Grab the freshest token directly from Firebase
        const token = auth.currentUser
          ? await auth.currentUser.getIdToken()
          : null;
          
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        // Safely checks error.response to prevent your app from crashing on network errors
        const status = error.response ? error.response.status : null;
        
        if (status === 401 || status === 403) {
          await logout();
          navigate("/auth/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function removes old interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;