import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [bToken, setBToken] = useState(
    localStorage.getItem("bToken") ? localStorage.getItem("bToken") : ""
  );
  const [profile,setProfile]=useState('')
  const getUserProfile=async()=>{
    try {
      const {data}=await axios.get(`${backendUrl}/api/user/`,{headers:{token}})
      if(data.success){
        console.log(data.data);
        
        setProfile(data.data)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
   if(token){
    getUserProfile()
   }
  },[token])
  

  const value = {
    backendUrl,
    token,
    setToken,
    bToken,
    setBToken,
    profile,
    setProfile,
    getUserProfile
   
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
