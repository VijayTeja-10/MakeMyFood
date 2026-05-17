import React, { useEffect, useState, useContext } from 'react'
import axiosInstance from './AxiosInstance'
import { Profile } from './PrivateRoutes'

const Table = (props) => {
    const {profile,setProfile}=useContext(Profile)
    const [s,setS]=useState(false)
    const [book,setBook]=useState([])
    const [tables,setTables]=useState([])
    const fetchTables=async()=>{
        try{
            const res=await axiosInstance.get(`/restaurants/${props.res.id}/`)
            setTables(res.data.table)
        }catch(error){console.log()}
    }
    useEffect(()=>{
        fetchTables();
        const inter=setInterval(fetchTables,3000)
        return ()=>clearInterval(inter)
    },[])
    const occ=(s)=>{
        if(!s.occupied){
            return 'btn-outline-danger'
        }else if(s.occupied && s.uid===profile.id){
            return 'btn-danger'
        }
        return 'btn-danger disabled'
    }
    const booking=async (s)=>{
        // setBook([t,s])
        // if(occ==='-outline'){setOcc('')}
        // else{setOcc('-outline')}
        // console.log(t,s,seats,tables)
        // s.occupied=false
        try{
            const res=await axiosInstance.get(`/seatpoll/${s.id}/`)
            if(!res.data.occupied){
                const response=await axiosInstance.patch(`/seatpoll/${s.id}/`,{"occupied": true,uid:profile.id})
                console.log('booked!',res)
            }else if (res.data.occupied && res.data.uid===profile.id) {
                const response=await axiosInstance.patch(`/seatpoll/${s.id}/`,{"occupied": false})
            } else {
                alert('Already booked by someone')
            }
        }catch(error){console.log()}
        finally{
            fetchTables();
        }
    }
    const renderSeats=(t)=>{
        let seats=[]
        t.seat.map((sit,index)=>{
            seats.push(
                <button key={index} onClick={()=>{booking(sit)}} class={`btn p-3 ${occ(sit)} text-center col-sm cols-2 m-3`}>seat {sit.val}</button>
            )
        })
        return seats
    }
    const renderTables=()=>{
        let tabs=[]
        console.log('tables ',tables)
        tables.map((table,index)=>{
            tabs.push(
            <div key={index} className="d-flex justify-content-around tab flex-wrap m-3 bg-white rounded">
                {renderSeats(table)}
            </div>)
        })
        return tabs
    }
    const Switch=(s)=>{
        if(s){
            return props.menu
        }else{
            return (
                <>
                <h3 className='text-center'>Book your Seats</h3>
                <div className='d-flex flex-wrap ms-5'>{renderTables()}</div>
                </>
            )
        }
    }
  return (
    <div className='container tables p-3 rounded'>
        <ul className="nav nav-tabs">
        <li className="nav-item">
            <button className="nav-link text-danger" onClick={()=>{setS(false)}} aria-current="page" >Tables</button>
        </li>
        <li className="nav-item">
            <button className="nav-link text-danger" aria-current="page" onClick={()=>{setS(true)}}>Menu</button>
        </li>
        </ul>
        {Switch(s)}
    </div>
    
  )
}

export default Table