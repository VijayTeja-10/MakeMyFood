import React, { useState } from 'react'
import Go from './Go'
import axios from 'axios'

const SignUp = () => {
    const [user,setUser]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [pass,setPass]=useState('')
    const [accepted,setAcc]=useState(false)
    const [error,setError]=useState({})

    const handleSubmit=async (e)=>{
        e.preventDefault()
        let userdata={username:user,email:email,phone:phone,password:pass}
        try{
            const response=await axios.post('http://127.0.0.1:8000/api/users/',userdata)
            setAcc(true)
            alert('Your account is created. Please Login!')
        }catch(errors){
            setError(errors.response.data)
            console.log(error,errors)
            setAcc(false)
            // alert(error)
        }finally{
            userdata={}
            setEmail('')
            setPass('')
            setPhone('')
            setUser('')
        }
    }
  return (
    <>
    <div className='d-flex container justify-content-center mt-5 p-5'>
        <form className='bg-secondary-subtle p-5 rounded min-w-50' onSubmit={handleSubmit}>
            <h4 className='text-center'>Create your Account</h4>
            { accepted && <div className='alert alert-success'>Your account is created. Please Login!</div> }
            <div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                <input type="text" className="form-control" onChange={(e)=>{setUser(e.target.value)}} value={user} id="exampleFormControlInput1" placeholder="user"/>
                <small>{error.username && <p>{error.username}</p>}</small>
                </div>
            </div>
            <div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={(e)=>{setEmail(e.target.value)}} value={email} id="exampleFormControlInput1" placeholder="name@example.com"/>
                <small>{error.email && <p>{error.email}</p>}</small>
                </div>
            </div>
            <div>
                <div className="mb-3">
                <label htmlFor="Input2" className="form-label">Phone Number</label>
                <input type="text" className="form-control" onChange={(e)=>{setPhone(e.target.value)}} value={phone} id="Input2" placeholder="XXXXXXXXXX"/>
                <small>{error.phone && <p>{error.phone}</p>}</small>
                </div>
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" onChange={(e)=>{setPass(e.target.value)}} value={pass} id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
                <small>{error.password && <p>{error.password}</p>}</small>
                <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and special characters.
                </div>
            </div>
            <button className='btn btn-info my-3' type="submit">SignUp</button>
            <div className='d-flex'>
                <small className=''>Already have an account?</small>
                <Go cls='h6' url='/' text='Login here!' />
            </div>
        </form>
    </div>
    </>
  )
}

export default SignUp