import React from 'react'
import Go from './Go'
const SignUp = () => {
  return (
    <>
    <div className='d-flex container justify-content-center mt-5 p-5'>
        <form className='bg-secondary-subtle p-5 rounded min-w-50' action="">
            <h4 className='text-center'>Create your Account</h4>
            <div>
                <div className="mb-3">
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