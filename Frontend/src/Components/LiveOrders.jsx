import React from 'react'
import axiosInstance from './AxiosInstance'

const LiveOrders = (props) => {
    // You can add your order fetching logic/state here later
    const pollOrders=()=>{
        if(!props.seller){return}
        try{
            const response=axiosInstance.post(`/orders/pollorders/`,{seller:props.seller})
        }catch(error){console.log()}
    }
    
    return (
        <div className="d-flex flex-column h-100 overflow-auto" style={{ maxHeight: '75vh' }}>
            
            {/* Example of an incoming live order card */}
            <div className="card mb-3 border-danger shadow-sm">
                <div className="card-header bg-danger text-white d-flex justify-content-between py-1">
                    <span>Order #1042</span>
                    <span>12:45 PM</span>
                </div>
                <div className="card-body p-2">
                    <h6 className="card-title mb-1">Table 4, Seat 2</h6>
                    <ul className="list-unstyled small mb-2">
                        <li>1x Chicken Biryani</li>
                        <li>2x Garlic Naan</li>
                    </ul>
                    <button className="btn btn-sm btn-outline-success w-100">Mark Completed</button>
                </div>
            </div>
            
            {/* Example of a waiting state if no orders */}
            <div className="text-center text-muted mt-5">
                <div className="spinner-border spinner-border-sm text-danger mb-2" role="status"></div>
                <p>Waiting for new orders...</p>
            </div>

        </div>
    )
}

export default LiveOrders