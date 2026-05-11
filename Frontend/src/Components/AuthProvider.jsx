import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

const Authorization=createContext()

const AuthProvider = ({children}) => {
    const [isLogged,setLog]=useState(!!localStorage.getItem('AccessToken'))
    console.log(isLogged)
    
  return (
  <>
  <Authorization.Provider value={{isLogged,setLog}}>{children}</Authorization.Provider>
  {/*route privatization by using Context*/}
  </>
  )
}
export default AuthProvider
export {Authorization}