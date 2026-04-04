import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Table'
import Items from './Items'
import FoodPlaces from './foods'
import { Link } from 'react-router-dom'
import Go from './Go'
import Nav from './Nav'
const Display = () => {
    const [mainScreen,Setmain]=useState(true)
    const [food,Setitems]=useState([])
    const [placename,Setplace]=useState('')
    const [isRes,Setres]=useState(false)
    const [tables,Settables]=useState(0)
    const [seats,Setseats]=useState(0)
    const [Rname,Setrname]=useState('')
    const [reviews,Setreviews]=useState([])
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

    const renderReviews=(rev)=>{
        const comments=[]
        rev.map((comment)=>(
            comments.push(<li class="list-group-item p-3 fs-5 text-success bg-dark">{comment}</li>)
        ))
        return <ul class="list-group list-group-flush">{comments}</ul>
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
                                <div className="d-flex justify-content-between">
                                    <button onClick={()=>{showMenu(place.items,place.name,place.isRes,place.tables,place.seats)}} className="btn btn-warning">{Menu(place.isRes)}</button>
                                    <button onClick={()=>{Setrname(place.name),Setreviews(place.reviews)}} class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Reviews</button>
                                </div>
                            </div>
                            </div>
                        </>
                ))}
                <div class="offcanvas offcanvas-bottom" tabindex="-1" data-bs-theme="dark" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div class="offcanvas-header">
                        <h3 class="offcanvas-title text-danger" id="offcanvasBottomLabel">Reviews for {Rname}</h3>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body small">
                        {renderReviews(reviews)}
                    </div>
                </div>
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
            <Nav cls='my-3'/>
            {Screen()}
        </>
    )
}

export default Display