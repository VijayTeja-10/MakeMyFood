import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Table'
import FoodPlaces from './foods'
const Display = () => {
    const [restaurants,Setrest]=useState([])
    
    const fetch= async ()=>{
        try{
        const response= await axios.get('http://127.0.0.1:8000/api/restaurants/')
        console.log('response => ',response.data)
        Setrest(response.data)
        }catch(error){
        console.log(error.response.data)
        }
    }
    
    const apicall=useEffect(()=>{
        fetch()
    },[])

    console.log(restaurants)
    return (
        <>
            <h1 className='d-flex justify-content-center fst-italic'>Make My Food</h1>
            <nav class="navbar navbar-expand-lg bg-body-tertiary my-3" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Foodie Search</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Tables</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter by
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Restaurants</a></li>
                        <li><a class="dropdown-item" href="#">Retailer Stores</a></li>
                        <li><a class="dropdown-item" href="#">Dishes</a></li>
                    </ul>
                    </li>
                </ul>
                <form class="d-flex col col-lg-0 ms-auto me-auto" role="search">
                    <input class="form-control me-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">🔎</button>
                </form>
                </div>
            </div>
            </nav>
            <div className='d-flex justify-content-around flex-wrap'>
                {
                    FoodPlaces.map((restaurant)=>(
                        <>  
                            <div className="card crd m-3">
                            <img src={restaurant.image} className="card-img-top object-fit-cover border rounded cim" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">{restaurant.desc} <br /><b>Phone :</b>{restaurant.phone}</p>
                                <div class="d-flex justify-content-center">
                                    <a href="#" className="btn btn-warning">View Menu</a>
                                </div>
                            </div>
                            </div>
                        </>
                ))}
            </div>
        </>
    )
}

export default Display