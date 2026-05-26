import { useState } from 'react'
import './App.css'
import Display from './Components/Display'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Account from './Components/Account'
import Orders from './Components/Orders'
import PrivateRoutes from './Components/PrivateRoutes'
import AuthProvider from './Components/AuthProvider'
import PublicRoutes from './Components/PublicRoutes'
import Search from './Components/Search'
import Dashboard from './Components/Dashboard'
function App() {  
  return (
    <>
    <AuthProvider>    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoutes> <Login /> </PublicRoutes>} />
        <Route path='/signup' element={<PublicRoutes> <SignUp /> </PublicRoutes>} />
        <Route path='/explore' element={<PrivateRoutes> <Display /> </PrivateRoutes>} />
        <Route path='/accounts' element={<PrivateRoutes> <Account /> </PrivateRoutes>} />
        <Route path='/orders' element={<PrivateRoutes> <Orders /> </PrivateRoutes>} />
        <Route path='/search' element={<PrivateRoutes> <Search /> </PrivateRoutes>} />

        <Route path='/manager/signup' element={<PublicRoutes> <SignUp isManager={true} /> </PublicRoutes>} />
        <Route path='/manager/dashboard' element={<PrivateRoutes> <Dashboard /> </PrivateRoutes>} />
        <Route path='/manager/accounts' element={<PrivateRoutes> <Account isManager={true} /> </PrivateRoutes>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App