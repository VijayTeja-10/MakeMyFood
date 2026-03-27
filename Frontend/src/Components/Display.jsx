import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Table'
import Items from './Items'
import FoodPlaces from './foods'
const Display = () => {
    const [mainScreen,Setmain]=useState(true)
    const [food,Setitems]=useState([])
    const [placename,Setplace]=useState('')
    const [isRes,Setres]=useState(false)
    const [tables,Settables]=useState(0)
    const [seats,Setseats]=useState(0)
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

    const showMenu=(food,name,Res,tables,seats)=>{
        Setres(Res)
        Settables(tables)
        Setseats(seats)
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
                                    <button onClick={()=>{showMenu(place.items,place.name,place.isRes,place.tables,place.seats)}} className="btn btn-warning">{Menu(place.isRes)}</button>
                                </div>
                            </div>
                            </div>
                        </>
                ))}
            </div>
        </>)
    }

    const ItemTables=(isRes)=>{
        if(isRes){
            return <><h1 className='d-flex justify-content-center m-2'>Welcome to {placename}</h1><Table tables={tables} seats={seats} menu={<Items items={food} name={placename}/>} /></>
        }else{
            return (<div><h1 className='d-flex justify-content-center m-2'>Welcome to {placename}</h1><Items items={food} name={placename}/></div>)
        }
    }

    const Screen=()=>{
        console.log(mainScreen)
        if(mainScreen){
            return (showMain())
        }else{
            return (ItemTables(isRes))
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
                    <li className="nav-item">
                    <a className="nav-link" href="#">Restaurants</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Take away Stores</a>
                    </li>
                    
                </ul>
                <form className="d-flex col col-lg-0 ms-2 me-5" role="search">
                    <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-danger" type="submit">🔍︎</button>
                </form>
                </div>
            </div>
            </nav>
            {Screen()}
        </>
    )
}

export default Display