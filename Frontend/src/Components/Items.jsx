import React from 'react'

const Items = ({items,name}) => {
    const Instock=(instock)=>{
        if(instock){
            return <button href="#" className="btn btn-warning ms-auto" >Add</button>
        }else{
            return <button href="#" className="btn btn-warning ms-auto disabled" >N/A</button>
        }
    }

  return (
    <>
    <div class='d-flex flex-wrap'>
        {
            items.map((item)=>(
                <div className="card d-flex justify-content-center m-3 fcrd" >
                <div className="row g-0">
                    <div className="d-flex justify-content-center col-md-4 me-auto">
                    <img src={item.img} className="card-img object-fit-fill border rounded fim m-3" alt="..."></img>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div class="d-flex justify-content-center flex-wrap">
                        <p className="card-text">{item.desc}</p>
                        <p className="card-text"><small class="text-body-secondary"><b>Price : {item.price}</b></small></p>                      
                        {Instock(item.instock)}
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