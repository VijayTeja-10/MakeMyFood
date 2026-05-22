import React, { useState } from 'react'
import Nav from './Nav'
import axiosInstance from './AxiosInstance'

const Items = (props) => {
    const [ord,setOrder]=useState({})
    const [items,setitems]=useState([])
    const [bill,setBill]=useState(0)
    if(props.isRes){const [seats,setSeats]=useState(props.seats.map(element => ([element.tval,element.val])))}
    const order=async(orderDetails)=>{
        
        // if(ord!={}){
        // try{            
        //     const response= await axiosInstance.patch(`/orders/${ord.id}/`,orderDetails)
        //     console.log('order updated',response)
        // }catch(error){
        //     console.log('order updated',error.response.data)
        // }}else{
        try{
            const fetchCart=await axiosInstance.get('/orders/usercart/')
            let cart=[...fetchCart.data]
            console.log('current cart ',fetchCart.data)
            if(fetchCart.data.length<=1 && [...fetchCart.data].pop().seller===orderDetails.seller){
                cart=cart.pop()
                cart.items.push(items.pop())
                console.log('pushed',cart,items)
                let newCart={"items": cart.items,"bill": orderDetails.bill}
                if(props.isRes){newCart.seats=orderDetails.seats}
                const response= await axiosInstance.patch(`/orders/${cart.id}/`,newCart)
            }else if(fetchCart.data.length===0){
                const response= await axiosInstance.post('/orders/',orderDetails)
            }else{
                alert('Please add items that belongs to one restaurant/store!')
            }
            // const response= await axiosInstance.post('/orders/',orderDetails)
            console.log('ordered',fetchCart.data)
            // setOrder(response.data)
        }catch(error){
            console.log('ordered',error)
        }
    // }
    }

    const handleOrder=(name,price,quantity)=>{
        if(!items.find(item=>item.name===name)){setBill(bill+Number(price))
        items.push({name:name,price:price,quantity:quantity})
        let orderDetails={
            "items": items,
            "bill": bill+Number(price),
            "paid": false,
            "buyer": props.uid,
            "seller": props.rid
        }
        if(props.isRes){orderDetails.seats=seats}
        console.log('Your Order',orderDetails)
        order(orderDetails)
    }
    }
    
    const Instock=(instock,name,price,quantity)=>{
        console.log('Items ',props.items)
        if(instock){
            return <button onClick={()=>{handleOrder(name,price,quantity)}} className="btn btn-warning ms-auto" >Add</button>
        }else{
            return <button className="btn btn-warning ms-auto disabled" >N/A</button>
        }
    }
    
  return (
    <>
    <div className='d-flex flex-wrap'>
        {
            props.items.map((item,index)=>(
                <div key={index} className="card d-flex justify-content-center m-3 fcrd" >
                <div className="row g-0">
                    {item.Rname?(<h5 className='text-center'>{item.Rname}</h5>):(<></>)}
                    <div className="d-flex justify-content-center col-md-4 me-auto">
                    <img src={item.image} className="card-img object-fit-fill border rounded fim m-3" alt="..."></img>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.item}</h5>
                        <div class="d-flex justify-content-center flex-wrap">
                        <p className="card-text">{item.desc}</p>
                        <p className="card-text"><small class="text-body-secondary"><b>Price : {item.price}</b></small></p>                      
                        {Instock(item.inStock,item.item,item.price,item.base_quantity)}
                        </div>
                    </div>
                    </div>
                </div>
                </div>))
            }
    </div></>
  )
}

export default Items