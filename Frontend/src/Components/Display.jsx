import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Table'
import Items from './Items'
// import FoodPlaces from './foods'
import { Link } from 'react-router-dom'
import Go from './Go'
import Nav from './Nav'

const Display = (props) => {
    const [mainScreen,Setmain]=useState(true)
    const [food,Setitems]=useState([])
    const [placename,Setplace]=useState('')
    const [isRes,Setres]=useState(false)
    const [place,Setpls]=useState({})
    const [seats,Setseats]=useState(0)
    const [Rname,Setrname]=useState('')
    const [reviews,Setreviews]=useState([])
    const [Res,Setrest]=useState([])
    const [Filtres,SetFil]=useState(null)
    const [navRes,setNav]=useState(false)
    
    const fetch= async ()=>{
        try{
        const response= await axios.get('http://127.0.0.1:8000/api/restaurants/')
        console.log('response => ',response.data)
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

    const showMenu=(food,name,Res,pls)=>{
        setNav(pls)
        Setres(Res)
        Setpls(pls)
        Setmain(!mainScreen)
        Setitems(food)
        Setplace(name)
    }

    const renderReviews=(rev)=>{
        const comments=[]
        rev.map((comment)=>(
            comments.push(<li class="list-group-item p-3 fs-5 text-success bg-dark">{comment.review}</li>)
        ))
        return <ul class="list-group list-group-flush">{comments}</ul>
    }

    const showMain=(FoodPlaces)=>{
        const noFilter=<>
            <div className='d-flex justify-content-around flex-wrap'>
                {
                    FoodPlaces.map((place)=>(
                        <>
                            <div key={place.id} className="card crd m-3">
                            <img src={place.image} className="card-img-top object-fit-cover border rounded cim" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{place.name}</h5>
                                <p className="card-text">{place.desc} <br /><b>Phone :</b>{place.phone}</p>
                                <div className="d-flex justify-content-between">
                                    <button onClick={()=>{showMenu(place.menu,place.name,place.isRes,place)}} className="btn btn-warning">{Menu(place.isRes)}</button>
                                    <button onClick={()=>{Setrname(place.name),Setreviews(place.review)}} class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Reviews</button>
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
        </>
        
        if(Filtres==null){return noFilter}
        else{
            const Filtered=<>
            <div className='d-flex justify-content-around flex-wrap'>
                {
                    FoodPlaces.map((place)=>(
                        <>{place.isRes==Filtres?(
                            <div key={place.id} className="card crd m-3">
                            <img src={place.image} className="card-img-top object-fit-cover border rounded cim" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{place.name}</h5>
                                <p className="card-text">{place.desc} <br /><b>Phone :</b>{place.phone}</p>
                                <div className="d-flex justify-content-between">
                                    <button onClick={()=>{showMenu(place.menu,place.name,place.isRes,place)}} className="btn btn-warning">{Menu(place.isRes)}</button>
                                    <button onClick={()=>{Setrname(place.name),Setreviews(place.review)}} class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Reviews</button>
                                </div>
                            </div>
                            </div>):(<></>)
                        }</>
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
        </>
        return Filtered
        }
        
    }

    const ItemTables=(isRes)=>{
        if(isRes){
            // console.log('table',tables)
            return <><h1 className='d-flex justify-content-center m-2'>Welcome to {placename}</h1><Table res={place}  menu={<Items items={food} name={placename}/>} /></>
        }else{
            return (<div><h1 className='d-flex justify-content-center m-2'>Welcome to {placename}</h1><Items items={food} name={placename}/></div>)
        }
    }

    const Screen=()=>{
        console.log(mainScreen)
        if(mainScreen){
            return (showMain(Res))
        }else{
            return (ItemTables(isRes))
        }
    }

    return (
        <>
        <h1 className='d-flex justify-content-center fst-italic'>Make My Food</h1>
            <Nav res={navRes} setFil={SetFil} cls='my-3'/>
            {Screen()}
        </>
    )
}

export default Display