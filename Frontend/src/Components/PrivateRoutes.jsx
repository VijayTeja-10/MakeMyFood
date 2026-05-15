import React, { useContext, createContext, useState, useEffect} from 'react'
import {Authorization} from './AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import axiosInstance from './AxiosInstance'

const Profile=createContext()

const PrivateRoutes = ({children}) => {
    const navi=useNavigate()
    const {isLogged,setLog}=useContext(Authorization)
    // console.log(isLogged,localStorage.getItem('AccessToken'),'hi')
    const [profile,setProfile]=useState({})

    const AddProfile=async ()=>{
      try{
        const response= await axiosInstance.get('/users/profile/')
        setProfile(response.data)
        console.log(response.data)
      }catch(err){
        console.log('refresh token error',err)
        navi('/')
        setLog(false)
      }
      
    }
    const Fetch=useEffect(()=>{AddProfile()},[])
  return (isLogged?(
        <Profile.Provider value={{profile,setProfile}}>{children}</Profile.Provider>
        ):(<Navigate to='/' />))
  
}

export default PrivateRoutes
export {Profile}