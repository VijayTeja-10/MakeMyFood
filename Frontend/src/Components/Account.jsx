import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authorization} from './AuthProvider'
import { Profile } from './PrivateRoutes'
import axiosInstance from './AxiosInstance'
const Account = (props) => {
    const {profile,setProfile}=useContext(Profile)
    let userdata=Object.assign({'password':''},profile)
    const navi=useNavigate()
    const {isLogged,setLog}=useContext(Authorization)
    const [edit,SetEdit]=useState('disabled')
    const back=(e)=>{
        e.preventDefault()
        props.isManager?navi('/manager/dashboard'):navi('/explore')
    }
    const signout=(e)=>{
        e.preventDefault()
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        // localStorage.removeItem('Profile')
        setLog(false)
        navi('/')
    }
    console.log('account',profile)
    const handleUpdate=async (e)=>{
        e.preventDefault()
        if(!userdata.password){
            delete userdata.password
        }
        try{
            const response=await axiosInstance.patch(`/users/${profile.id}/`,userdata)
            const user=await axiosInstance.get(`/users/profile/`)
            // console.log(user.data)
            setProfile(user.data)
            alert('Your account details are updated!')
        }catch(error){
            alert('Failed to update your account details!')
        }
    }

    const delAcc=async (e)=>{
        e.preventDefault()
        try{
            try{
                const pendingSeats=await axiosInstance.get('/seatpoll/userseats/')
                await Promise.all(
                    pendingSeats.data.map((booking)=> axiosInstance.patch(`/seatpoll/${booking.id}/`,{occupied:false,uid:null}))
                )                
            }catch(err){
                console.log(err)
            }finally{
                const response=await axiosInstance.delete(`/users/${profile.id}/`)
                signout()
            }
        }catch(error){
            console.log()
        }
    }

  return (
    <>
    <div className='d-flex container justify-content-center mt-5 p-5'>
        <form className='bg-secondary-subtle p-5 rounded min-w-50' onSubmit={(e)=>{e.preventDefault()}}>
            <div className='d-flex'>
                <legend className='text-center'>Your Account</legend>
                <button className='text-danger btn btn-close pb' onClick={back}></button>
            </div>
            <div>
                <div className={`mb-3 ${edit}`}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                <input type="text" onChange={(e)=>{userdata.username=e.target.value}} className="form-control" id="exampleFormControlInput1" defaultValue={userdata.username}/>
                </div>
            </div>
            <div>
                <div className={`mb-3 ${edit}`}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" onChange={(e)=>{userdata.email=e.target.value}} className="form-control" id="exampleFormControlInput1" defaultValue={userdata.email}/>
                </div>
            </div>
            <div>
                <div className="mb-3">
                <label htmlFor="Input2" className="form-label">Phone Number</label>
                <input type="text" onChange={(e)=>{userdata.phone=Number(e.target.value)}} className="form-control" id="Input2" defaultValue={userdata.phone}/>
                </div>
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" onChange={(e)=>{userdata.password=e.target.value}} defaultValue={userdata.password} id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
                <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and special characters.
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-success my-3' type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Save</button>
                <button className='btn btn-danger my-3'  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Close Account</button>
                <button className='btn btn-dark my-3' onClick={signout} >SignOut</button>
            </div>
        </form>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Confirm Changes</h1>
            </div>
            <div class="modal-body">
                Would you like to update your account details?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">Save changes</button>
            </div>
            </div>
        </div>
        </div>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Close Account</h1>
            </div>
            <div class="modal-body">
                Would you like to delete your account?<br />
                <p className='text-warning'>Warning: All your data will be permanently lost.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onClick={delAcc} data-bs-dismiss="modal">Delete</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Account