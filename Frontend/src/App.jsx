import { useState } from 'react'
import './App.css'
import Display from './Components/Display'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Account from './Components/Account'
import Orders from './Components/Orders'


function App() {  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/explore' element={<Display />} />
        <Route path='/accounts' element={<Account />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App