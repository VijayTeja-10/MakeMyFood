import React, { useState } from 'react'

const Table = (props) => {
    let count=0
    const renderSeats=()=>{
        let seats=[]
        for(let j=1;j<=props.seats;j++){
            seats.push(<div class="col-sm cols-2 m-3 bg-success rounded">
                <button class="btn p-3 text-center">seat {j}</button>
            </div>)}
        return seats
    }
    const renderTables=()=>{
        let tables=[]
        for(let i=1;i<=props.tables;i++){
            tables.push(
            <div class="d-flex justify-content-around tab flex-wrap m-3 bg-white rounded">
                {renderSeats()}
            </div>)
        }
        return tables
    }
  return (
    <div className='d-flex justify-content-center flex-wrap'>{renderTables()}</div>
  )
}

export default Table