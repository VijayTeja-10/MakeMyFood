import React from 'react'

const Dishes = (props) => {
  return (
    <>
        {
            props.dishes.map((dish)=>(
                <p>{dish.item}</p>
            ))
        }
    </>
  )
}

export default Dishes