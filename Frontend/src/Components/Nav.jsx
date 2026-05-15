import React from 'react'
import { Link } from 'react-router-dom'
const Nav = (prop) => {
  return (
    <>
        <nav className={`navbar navbar-expand-lg bg-body-tertiary sticky-top {prop.cls}`} data-bs-theme="dark">
            <div className="container-fluid">
                <a onClick={()=>{}} className="navbar-brand" href="/explore">Foodie Search</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className='nav-link' to='/accounts' >My Account</Link>
                    {/* <Go cls='nav-link' url='/accounts'/> */}
                    </li>
                    <li className="nav-item">
                    <Link className='nav-link' to='/orders' >My Orders</Link> {/* you must have to store userid for both acc & ord*/}
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Restaurants</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Take away Stores</a>
                    </li>
                    
                </ul>
                <form className="d-flex col col-lg-0 ms-5" role="search">
                    <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-danger" type="submit">🔍︎</button>
                </form>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Nav