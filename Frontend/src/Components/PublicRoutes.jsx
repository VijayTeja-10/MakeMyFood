import React, { useContext, useEffect, useState } from 'react'
import { Authorization } from './AuthProvider'
import { Navigate } from 'react-router-dom'
import axiosInstance from './AxiosInstance'

const PublicRoutes = ({children}) => {
    const {isLogged}=useContext(Authorization)
    const [Go,setGo]=useState(<Navigate to='/' />)
    const navi=async()=>{
      const profile= await axiosInstance.get('/users/profile/')
      return profile.data.isManager?(<Navigate to='/manager/dashboard' />): (<Navigate to='/explore' />)
    }
    useEffect(()=>{setGo(navi())},[])
  return (
    !isLogged?(children):(<>{Go}</>)
  )
}

export default PublicRoutes