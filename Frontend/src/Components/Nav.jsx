import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axiosInstance from './AxiosInstance'
import Table from './Table'
import Items from './Items'

const Nav = (prop) => {
    const navi=useNavigate()
    const [item,setItem]=useState('')
    const useFilter=(bool)=>{
        if(prop.setFil){
            prop.setFil(bool)
            console.log('filtering ',bool)
        }else{
            alert('Go to explore page to apply this filter')
        }
    }

    const handleSearch=(e)=>{
        e.preventDefault()
        if(!item){return}
        console.log('navbar',item)
        if(prop.res){
            localStorage.setItem('ResId',prop.res.id)        
        }else{localStorage.removeItem('ResId')}
        localStorage.setItem('FoodItem',item)
        navi('/search')  
    }

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
                    <button className="nav-link" onClick={()=>{useFilter(true)}}>Restaurants</button>
                    </li>
                    <li className="nav-item">
                    <button className="nav-link" onClick={()=>{useFilter(false)}}>Take away Stores</button>
                    </li>
                    
                </ul>
                <form className="d-flex col col-lg-0 ms-5" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-1" type="text" onChange={(e)=>{setItem(e.target.value)}} placeholder="Search" aria-label="Search" value={item}/>
                    <button className="btn btn-outline-danger" type="submit">🔍︎</button>
                </form>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Nav