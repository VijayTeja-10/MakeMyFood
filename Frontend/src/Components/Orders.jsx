import React, { useContext, useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
// import Items from './cart'
import Nav from './Nav'
import axiosInstance from './AxiosInstance'
import PrivateRoutes, { Profile } from './PrivateRoutes'
const Orders = () => {
    const {profile,setProfile}=useContext(Profile)
    const navi=useNavigate()
    const [reviewPlace,setPlace]=useState('')
    const [disable,setDisable]=useState(false)
    const [review,setRv]=useState('')
    const [orderId,setId]=useState(null)
    const [placeId,setplaceId]=useState(null)
    const [Items,setItems]=useState([])//places
    const [Its,setIts]=useState([])//cart items
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
    const setReview=(pid,oid,pname,p)=>{
        if(p.review){
            setRv(p.review)
            setDisable(true)
        }else{
            setRv('')
            setDisable(false)
        }
            setPlace(pname)
            setId(oid)
            setplaceId(pid)
            console.log(pid,placeId)
            console.log(pname)
        
    }
    const Disablity=()=>{
        return disable?('disabled'):('')
    }
    const editItem=(itemX,i,itx,oid)=>{
        setItem(itemX)
        setItemId(i)
        setPrice(Number(itemX.price))
        setQuantity(Number(itemX.quantity))
        setIts(itx)
        setId(oid)
        console.log(itemX,oid)
    }
    const renderSeats=(seats)=>{
        return (
            <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    View Seats
                </button>
                <ul className="dropdown-menu p-3">
                    {
                        seats.map((seat)=>(<li>Table {seat[0]} Seat {seat[1]}</li>))
                    }
                </ul>
            </div>
        )
    }
    const fetchOrders=async ()=>{
        try{
            const allOrders=await axiosInstance.get(`/orders/userOrders/`)
            setItems(allOrders.data)
            console.log('orders ',allOrders.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{fetchOrders()},[])
    const postReview=async ()=>{
        let details={
            "review": review,
            "user": profile.id,
            "restaurant": placeId,
            "order": orderId
        }
        console.log(details)
        try{
            const post=await axiosInstance.post('/reviews/',details)
            fetchOrders()
            console.log('review posted')
            window.location.reload()
        }catch(error){
            console.log(error.response.data)
        }
    }
    const write=()=>{
        return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{disable?'Your ':'Write a'} review for {reviewPlace}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(e)=>setRv(e.target.value)} value={review} rows="3"></textarea>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={postReview} className={`btn btn-success ${Disablity()}`}>Post</button>
                </div>
            </div>
        </div>
        </div>)
    }

    const updateCart=async (data)=>{
        console.log(data,itemId)
        let temp=[...Its]
        temp[itemId]=data
        let bill=Math.sumPrecise(temp.map((it)=>(Number(it.price))))
        console.log('patching',orderId,temp)
        try{
            const response=await axiosInstance.patch(`/orders/${orderId}/`,{items:temp,bill:Number(bill)})
            console.log('patched',response.data)
            fetchOrders()
        }catch(error){
            console.log()
        }
    }
    const deleteCartItem=async ()=>{
        console.log(itemId)
        let temp=[...Its]
        temp.splice(itemId,1)
        let bill=Math.sumPrecise(temp.map((it)=>(Number(it.price))))
        console.log('del patching',orderId,temp)
        try{
            const response=await axiosInstance.patch(`/orders/${orderId}/`,{items:temp,bill:Number(bill)})
            console.log('del patched',response.data)
            fetchOrders()
        }catch(error){
            console.log()
        }
    }

    const editItems=()=>{
        
        return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">{Item.name}</h1>
                
                <button className='btn btn-close' onClick={()=>{deleteCartItem()}} data-bs-toggle="tooltip" data-bs-placement="top" title="Remove item"></button>
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
                <button type="button" onClick={()=>{updateCart({name:Item.name,price:price,quantity:quantity})}} class="btn btn-success">Save</button>
            </div>
            </div>
        </div>
        </div>)
    }

    const renderOrders=()=>{
        const history=[]
        Items.map((place)=>(place.paid?(
            
            history.push(
                <div className="card bg-danger-subtle crd m-2">
                <div className="card-header d-flex justify-content-between">
                    <p className='text-wrap me-2'><b>₹{place.bill}</b> Paid on {place.date}</p>
                    <button onClick={()=>{setReview(place.seller,place.id,place.Rname,place)}} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">🖂</button>
                    {console.log(place.seller,place.id,place.Rname)}
                </div>
                <div className="card-body">
                    <div className='d-flex justify-content-between m-2'>
                        <div>
                            <h5 className="card-title">{place.Rname}</h5>
                            {place.seats?(<p className="card-text">You've dined here.</p>):(<p className="card-text">You've picked here.</p>)}
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
                                <button class="btn dropdown-item">
                                {it.name} - {it.quantity} - ₹{it.price}
                                </button>
                            </li>))}
                        </ul>
                        </div>
                        <div className="btn-group dropend">
                        {place.seats?(renderSeats(place.seats)):(<></>)}
                        </div>
                    </div>
                </div>
                </div>
            )
        ):(<></>)))
        
        return <div className='d-flex flex-wrap justify-content-between'>{history}{write()}</div>
    }
    const delCart=async(oid)=>{
        try{
            const response=await axiosInstance.delete(`/orders/${oid}/`)
            fetchOrders()
        }catch(error){
            alert('Failed to delete Cart. Please try again!')
        }
    }
    const payBill=async(oid)=>{
        try{
            const response=await axiosInstance.patch(`/orders/${oid}/`,{paid:true})
            fetchOrders()
        }catch(error){
            alert('Failed to pay the bill. Please try again!')
        }
    }
    const renderCart=()=>{
        const cart=[]
        Items.map((place)=>(
            
            !place.paid?(cart.push(
                <div className="card bg-info-subtle crd m-2">
                <div className="card-header d-flex justify-content-between">
                    <button onClick={()=>{delCart(place.id)}} className='btn h4 btn-danger text-light me-auto fw-bold'>×</button>
                    <button onClick={()=>{payBill(place.id)}} className='btn btn-danger '>Pay ₹{place.bill}</button>
                </div>
                <div className="card-body">
                    <div className='d-flex justify-content-between m-2'>
                        <div>
                            <h5 className="card-title">{place.Rname}</h5>
                            <p className="card-text">Complete your payment.</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className="dropdown me-2">
                        <button className="btn bg-success-subtle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            View Items
                        </button>
                        <ul className="dropdown-menu">
                            {place.items.map((it,index)=>(
                            <li> 
                                <button key={index} onClick={()=>{editItem(it,index,place.items,place.id)}} class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                {it.name} - {it.quantity} - ₹{it.price}
                                </button>
                            </li>))}
                        </ul>
                        </div>
                        {place.seats?(renderSeats(place.seats)):(<></>)}
                    </div>
                </div>
                </div>
            )):(<></>)
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