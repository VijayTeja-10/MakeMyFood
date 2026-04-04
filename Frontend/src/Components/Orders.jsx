import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Items from './cart'
import Nav from './Nav'
const Orders = () => {
    const navi=useNavigate()
    const [reviewPlace,setPlace]=useState('')
    const [reviewId,setId]=useState(null)
    const [Item,setItem]=useState({})
    const [itemId,setItemId]=useState(null)
    const [price,setPrice]=useState(0)
    const [quantity,setQuantity]=useState(0)
    const exit=()=>{
        navi('/explore')
    }
    const handleQuant=(c)=>{
        if(c=='+'){
            let p=price+(price/quantity)
            setPrice(p)
            setQuantity(quantity+1)
        }else{
            if(quantity>1){
            setPrice(price-(price/quantity))
            setQuantity(quantity-1)}
        }
    }
    const setReview=(pname,i)=>{
        setPlace(pname)
        setId(i)
        console.log(pname)
    }
    const editItem=(itemX,i)=>{
        setItem(itemX)
        setItemId(i)
        setPrice(itemX.price)
        setQuantity(itemX.quantity)
        console.log(itemX)
    }
    const write=()=>{
        return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Write a review for {reviewPlace}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success">Post</button>
                </div>
            </div>
        </div>
        </div>)
    }

    const editItems=()=>{
        
        return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">{Item.name}</h1>
                <button className='btn btn-close'></button>
            </div>
            <div class="modal-body">
                <h6 className='me-3'>Price : {price}</h6>
                <div className='d-flex justify-content-between'>
                    <h6 className='me-3'>Quantity : {quantity}</h6>
                    <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={()=>{handleQuant('-')}} className="btn btn-warning">-</button>
                    <button onClick={()=>{handleQuant('+')}}  className="btn btn-success">+</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success">Save</button>
            </div>
            </div>
        </div>
        </div>)
    }

    const renderOrders=()=>{
        const history=[]
        for(let i=1;i<=5;i++){
            history.push(
                <div className="card bg-danger-subtle crd m-2">
                <div className="card-header d-flex justify-content-between">
                    <p className='text-wrap me-2'><b>₹{i}000</b> Paid on dd-mm-yyyy</p>
                    <button onClick={()=>{setReview(`Placename ${i}`,{i})}} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">🖂</button>
                    
                </div>
                <div className="card-body">
                    <div className='d-flex justify-content-between m-2'>
                        <div>
                            <h5 className="card-title">Placename {i}</h5>
                            <p className="card-text">You've dined here.</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className="dropdown me-2">
                        <button className="btn bg-success-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            View Items
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item text-wrap" href="#">Action</a></li>
                            <li><a className="dropdown-item text-wrap" href="#">Another action</a></li>
                            <li><a className="dropdown-item text-wrap" href="#">Something else here</a></li>
                        </ul>
                        </div>
                        <div className="btn-group dropend">
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            View Seats
                        </button>
                        <ul className="dropdown-menu p-3">
                            <li>Table {i} Seat{i}</li>
                            <li>Table {i} Seat{i+1}</li>
                        </ul>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
        return <div className='d-flex flex-wrap justify-content-between'>{history}{write()}</div>
    }
    const renderCart=()=>{
        const cart=[]
        Items.map((place)=>(
            cart.push(
                <div className="card bg-info-subtle crd m-2">
                <div className="card-header d-flex justify-content-between">
                    <button className='btn h4 btn-danger text-light me-auto fw-bold'>×</button>
                    <button className='btn btn-danger '>Pay ₹{place.price}</button>
                </div>
                <div className="card-body">
                    <div className='d-flex justify-content-between m-2'>
                        <div>
                            <h5 className="card-title">{place.placeName}</h5>
                            <p className="card-text">Complete your payment.</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className="dropdown me-2">
                        <button className="btn bg-success-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            View Items
                        </button>
                        <ul className="dropdown-menu">
                            {place.items.map((it)=>(
                            <li> 
                                <button onClick={()=>{editItem(it,place.id)}} class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                {it.name} - {it.quantity} - ₹{it.price}
                                </button>
                            </li>))}
                        </ul>
                        </div>
                        <div className="btn-group dropend">
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            View Seats
                        </button>
                        <ul className="dropdown-menu p-3">
                            <li>Table </li>
                            <li>Table </li>
                        </ul>
                        </div>
                    </div>
                </div>
                </div>
            )
        ))
        return <div className='d-flex flex-wrap justify-content-between'>{cart}{editItems()}</div>
    }
  return (
    <><Nav />
    <div className='p-3'>
        <div className='container ms-auto me-auto my-3 p-3'>
            <div className=''>
                <h5 className='text-center'>Cart</h5>
                {renderCart()}
            </div>
        </div>
        
        <div className='container ms-auto me-auto my-3 p-3'>
            <div className=''>
                <h5 className='text-center'>History</h5>
                {renderOrders()}
            </div>
        </div>
    </div></>
  )
}

export default Orders