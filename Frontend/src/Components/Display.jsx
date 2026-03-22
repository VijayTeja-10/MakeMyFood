import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Table'
import Items from './Items'
import FoodPlaces from './foods'
const Display = () => {
    const [mainScreen,Setmain]=useState(true)
    const [food,Setitems]=useState([])
    const [placename,Setplace]=useState('')
    const fetch= async ()=>{
        try{
        const response= await axios.get('http://127.0.0.1:8000/api/restaurants/')
        // console.log('response => ',response.data)
        Setrest(response.data)
        }catch(error){
        // console.log(error.response.data)
        }
    }
    
    const apicall=useEffect(()=>{
        fetch()
    },[])

    const Menu=(isRes)=>{
        if(isRes){
            return 'View Menu'
        }else{
            return 'View Items'
        }

    }

    const showMenu=(food,name)=>{
        Setmain(!mainScreen)
        Setitems(food)
        Setplace(name)
    }

    const reset=()=>{
        Setplace('')
        Setitems([])
    }

    const showMain=()=>{
        return (<>
            <div className='d-flex justify-content-around flex-wrap'>
                {
                    FoodPlaces.map((place)=>(
                        <>  
                            <div className="card crd m-3">
                            <img src={place.image} className="card-img-top object-fit-cover border rounded cim" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{place.name}</h5>
                                <p className="card-text">{place.desc} <br /><b>Phone :</b>{place.phone}</p>
                                <div className="d-flex justify-content-center">
                                    <button onClick={()=>{showMenu(place.items,place.name)}} className="btn btn-warning">{Menu(place.isRes)}</button>
                                </div>
                            </div>
                            </div>
                        </>
                ))}
            </div>
        </>)
    }

    const Screen=()=>{
        console.log(mainScreen)
        if(mainScreen){
            return (showMain())
        }else{
            return (<div><Items items={food} name={placename}/></div>)
        }
    }

    return (
        <>
        <h1 className='d-flex justify-content-center fst-italic'>Make My Food</h1>
            <nav className="navbar navbar-expand-lg bg-body-tertiary my-3" data-bs-theme="dark">
            <div className="container-fluid">
                <a onClick={()=>{Setmain(true)}} className="navbar-brand" href="#">Foodie Search</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Account</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">My Orders</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter by
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Restaurants</a></li>
                        <li><a className="dropdown-item" href="#">Retailer Stores</a></li>
                        <li><a className="dropdown-item" href="#">Dishes</a></li>
                    </ul>
                    </li>
                </ul>
                <form className="d-flex col col-lg-0 ms-auto me-auto" role="search">
                    <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">🔍︎</button>
                </form>
                </div>
            </div>
            </nav>
            {Screen()}
        </>
    )
}

export default Display