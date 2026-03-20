import React, { useState } from 'react'
import Dishes from './Dishes'

const Table = (props) => {
    let count=0
  return (
    <>
        {
            props.tables.map((table)=>(
                <>
                    <h4>Table : {count=count+1}</h4>
                    <Dishes dishes={table.dishes} />
                </>
            ))
        }
    </>
  )
}

export default Table