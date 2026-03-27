import React, { useState } from 'react'

const Table = (props) => {
    const [s,setS]=useState(false)
    const [book,setBook]=useState([])
    const [occ,setOcc]=useState('-outline')
    const booking=(t,s)=>{
        setBook([t,s])
        if(occ==='-outline'){setOcc('')}
        else{setOcc('-outline')}
        console.log(t,s,seats,tables)
    }
    const renderSeats=(t)=>{
        let seats=[]
        for(let j=1;j<=props.seats;j++){
            seats.push(
                <button onClick={()=>{booking(t,j)}} class={`btn p-3 btn${occ}-danger text-center col-sm cols-2 m-3`}>seat {j}</button>
            )}
        return seats
    }
    const renderTables=()=>{
        let tables=[]
        for(let i=1;i<=props.tables;i++){
            tables.push(
            <div className="d-flex justify-content-around tab flex-wrap m-3 bg-white rounded">
                {renderSeats(i)}
            </div>)
        }
        return tables
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