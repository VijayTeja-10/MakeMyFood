import React, { useState, useEffect } from 'react'
import axiosInstance from './AxiosInstance'

const LiveOrders = (props) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true; // Prevents state updates if component unmounts

        const pollOrders = async () => {
            // if (!props.seller) return;
            try {
                const response = await axiosInstance.post(`/orders/pollorders/`, { seller: props.seller })
                console.log(props.seller,response.data)
                if (isMounted) {
                    // Sort descending by ID to act like a stack (newest first)
                    const newestFirst = response.data.sort((a, b) => b.id - a.id)
                    setOrders(newestFirst)
                    setLoading(false)
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error)
            }
        }

        // 1. Fetch immediately on mount
        pollOrders()
        
        // 2. Set up the 3-second polling interval
        const intervalId = setInterval(pollOrders, 3000)

        // 3. Cleanup function to clear interval when component unmounts
        return () => {
            isMounted = false
            clearInterval(intervalId)
        }
    }, [props.seller]) // Re-run if the seller ID changes
    
    const updateOrder=async(isAccepted,ordId)=>{
        try{
            if(isAccepted){
                const response = await axiosInstance.patch(`/orders/${ordId}/`,{paid:true})
                console.log('Accepted',response.data)
            }else{
                const response = await axiosInstance.delete(`/orders/${ordId}/`)
                console.log('Not Accepted',response.data)
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="d-flex flex-column h-100 overflow-auto" style={{ maxHeight: '75vh' }}>
            
            {loading && (
                <div className="text-center text-muted mt-5">
                    <div className="spinner-border spinner-border-sm text-danger mb-2" role="status"></div>
                    <p>Fetching live orders...</p>
                </div>
            )}

            {!loading && orders.length === 0 && (
                <div className="text-center text-muted mt-5">
                    <p>No active orders at the moment.</p>
                </div>
            )}

            {/* Map through the sorted stack of orders */}
            {orders.map((order) => (
                <div key={order.id} className="card mb-3 border-danger shadow-sm">
                    
                    {/* Header: Displays Name and Arrival Time */}
                    <div className="card-header bg-danger text-white d-flex justify-content-between py-2 align-items-center">
                        <span className="fw-bold text-truncate" style={{ maxWidth: '70%' }}>
                            {order.user[0]} {/* Customer Name */}
                        </span>
                        <span className="small opacity-75">Arrives in: {order.arrival}</span>
                    </div>

                    <div className="card-body p-2">
                        {/* Customer Contact Number */}
                        <div className="small text-muted mb-2 border-bottom pb-1">
                            <span className="fw-semibold text-secondary">Contact:</span> {order.user[1]}
                        </div>

                        {/* Table & Seats Overview */}
                        <div className="mb-2 d-flex flex-wrap gap-1">
                            {order.seats.map((seatInfo, index) => (
                                <button key={index} className='btn btn-sm tables m-1'>
                                    <h6 className="card-title mb-0 fw-bold">Table {seatInfo[0]}</h6>
                                    <span className="small">Seat {seatInfo[1]}</span>
                                </button>
                            ))}
                        </div>

                        {/* List of Items */}
                        <ul className="list-unstyled small mb-3 bg-light p-2 rounded border text-secondary">
                            {order.items.map((item, index) => (
                                <li key={index} className="d-flex justify-content-between mb-1 border-bottom pb-1">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span className="fw-semibold text-dark">₹{item.price}</span>
                                </li>
                            ))}
                            <li className="d-flex justify-content-between mt-2 pt-1">
                                <span className="fw-bold text-dark">Total Bill:</span>
                                <span className="fw-bold text-success">₹{order.bill}</span>
                            </li>
                        </ul>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                            <button 
                                className="btn btn-sm btn-success flex-grow-1 fw-semibold"
                                onClick={() => updateOrder(true,order.id)}
                            >
                                Accept
                            </button>
                            <button 
                                className="btn btn-sm btn-outline-danger flex-grow-1 fw-semibold"
                                onClick={() => updateOrder(false,order.id)}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LiveOrders