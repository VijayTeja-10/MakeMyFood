import React from 'react'
import Go from './Go'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const navi=useNavigate()
    const handleLogin=(e)=>{
        e.preventDefault()
        try{
            navi('explore')
        }catch(er){
            console.log(er)
        }        
    }
  return (
    <>
    <div className='d-flex container justify-content-center mt-5 p-5' onSubmit={handleLogin}>
        <form className='bg-secondary-subtle p-5 rounded min-w-50' action="">
            <h4 className='text-center'>Login to your Account</h4>
            <div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
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
    </>
  )
}

export default Login