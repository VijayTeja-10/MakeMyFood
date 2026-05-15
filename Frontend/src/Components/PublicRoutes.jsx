import React, { useContext } from 'react'
import { Authorization } from './AuthProvider'
import { Navigate } from 'react-router-dom'
const PublicRoutes = ({children}) => {
    const {isLogged}=useContext(Authorization)
  return (
    !isLogged?(children):(<Navigate to='/explore' />)
  )
}

export default PublicRoutes