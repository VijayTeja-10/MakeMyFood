import React from 'react'
import { Link } from 'react-router-dom'
const Go = (props) => {
  return (
    <>
    <Link className={`${props.cls}`} to={props.url}>{props.text}</Link>
    </>
  )
}

export default Go