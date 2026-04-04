import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Account = () => {
    const navi=useNavigate()
    const [edit,SetEdit]=useState('disabled')
    const back=(e)=>{
        e.preventDefault()
        navi('/explore')
    }
    const signout=(e)=>{
        e.preventDefault()
        navi('/')
    }

  return (
    <>
    <div className='d-flex container justify-content-center mt-5 p-5'>
        <form className='bg-secondary-subtle p-5 rounded min-w-50'>
            <div className='d-flex'>
                <legend className='text-center'>Your Account</legend>
                <button className='text-danger btn btn-close pb' onClick={back}></button>
            </div>        
            <div>
                <div className={`mb-3 ${edit}`}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
            </div>
            <div>
                <div className="mb-3">
                <label htmlFor="Input2" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="Input2" placeholder="+91-XXXXXXXXXX"/>
                </div>
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
                <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and special characters.
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-success my-3' type="submit">Save</button>
                <button className='btn btn-dark my-3' onClick={signout} >SignOut</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Account