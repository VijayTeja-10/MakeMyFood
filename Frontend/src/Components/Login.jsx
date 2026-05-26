import React, { useContext, useState } from 'react'
import Go from './Go'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import axiosInstance from './AxiosInstance'
import { Authorization } from './AuthProvider'
const Login = () => {
    const navi=useNavigate()
    const {isLogged,setLog}=useContext(Authorization)
    const [email,setEmail]=useState('')
    const [password,setPass]=useState('')
    const handleLogin=async (e)=>{
        e.preventDefault()
        let userdata={email:email,password:password}
        try{
            const response=await axios.post('http://127.0.0.1:8000/api/token/',userdata)
            localStorage.setItem('AccessToken',response.data.access)
            localStorage.setItem('RefreshToken',response.data.refresh)
            setLog(true)
            const profile= await axiosInstance.get('/users/profile/')
            console.log('log prof', profile.data)
            if(profile.data.isManager){
                location.reload()
                (navi('/manager/dashboard'))
                // localStorage.setItem('Manager',true)
            }else{
                location.reload()
                (navi('/explore'))
            }
        }catch(er){
            console.log(er)
            if(er.code==='ERR_BAD_REQUEST'){alert('Invalid Credentials')}
        }finally{
            userdata={}
            setEmail('')
            setPass('')
        }
    }
  return (
    <>
    <header className='fixed-top'>
        <h1 class=" fst-italic d-flex justify-content-center">Make My Food</h1>
    </header>
    <div className='d-flex container justify-content-center mt-5 p-5' onSubmit={handleLogin}>
        <form className='bg-secondary-subtle p-5 rounded min-w-50' action="">
            <h4 className='text-center'>Login to your Account</h4>
            <div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control"  onChange={(e)=>{setEmail(e.target.value)}} value={email} id="exampleFormControlInput1"/>
                </div>
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" id="inputPassword5" className="form-control" onChange={(e)=>{setPass(e.target.value)}} value={password} aria-describedby="passwordHelpBlock"/>
                <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and special characters.
                </div>
            </div>
            <button className='btn btn-primary my-3' type="submit">Login</button>
            <div className='d-flex'>
                <small className=''>Don't have an account?</small>
                <Go cls='h6' url='/signup' text='SignUp here!' />
            </div>
        </form>
    </div>
    <footer className='bg-dark text-light p-2 fixed-bottom'>
        <p className='d-flex justify-content-center mt-3'>© 2026 MakeMyFood — &nbsp;<Go cls='text-danger' url='/manager/signup' text='Register your restaurant and grow with us.'/></p>
    </footer>
    </>
  )
}

export default Login