import React, { useContext, createContext, useState} from 'react'
import {Authorization} from './AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile=createContext()

const PrivateRoutes = ({children}) => {
    const {isLogged}=useContext(Authorization)
    // console.log(isLogged,localStorage.getItem('AccessToken'),'hi')
    const [profile,setProfile]=useState({})

    const AddProfile=async ()=>{
      try{
        const response= await axios.get('http://127.0.0.1:8000/api/users/profile/',{headers:{Authorization:`Bearer ${localStorage.getItem('AccessToken')}`}})
        setProfile(response.data)
        console.log(response.data)
        localStorage.setItem('Profile','Loaded')
      }catch(err){
        console.log()
      }
      
    }
    if(isLogged && !localStorage.getItem('Profile')){
      AddProfile()
    }
  return (isLogged?(
        <Profile.Provider value={{profile,setProfile}}>{children}</Profile.Provider>
        ):(<Navigate to='/' />))
  
}

export default PrivateRoutes
export {Profile}