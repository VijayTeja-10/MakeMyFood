import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import axiosInstance from './AxiosInstance'
import { Profile } from './PrivateRoutes'

const RestaurantOrderHistory = () => {
    const { profile } = useContext(Profile)
    const [orders, setOrders] = useState([])
    const [selectedReview, setSelectedReview] = useState({ customer: '', text: '' })
    
    // State to handle which tab is active: 'history' or 'reviews'
    const [activeTab, setActiveTab] = useState('history')

    const fetchHistory = async () => {
        try {
            const response = await axiosInstance.post(`/orders/orderhistroy/`, { seller: profile.resId })
            setOrders(response.data)
        } catch (error) {
            console.error("Failed to fetch history", error)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    const handleViewReview = (user, reviewText) => {
        setSelectedReview({
            customer: user[0],
            text: reviewText || "No review provided by the customer yet."
        })
    }

    const renderSeats = (seats) => {
        return (
            <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    View Seats
                </button>
                <ul className="dropdown-menu p-3">
                    {seats.map((seat, index) => (
                        <li key={index} className="dropdown-item-text">
                            Table {seat[0]} Seat {seat[1]}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    const ReviewModal = () => (
        <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                        <h1 className="modal-title fs-5" id="reviewModalLabel">
                            Review from {selectedReview.customer}
                        </h1>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <p className="fst-italic">"{selectedReview.text}"</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )

    // --- TAB 1: ORDER HISTORY ---
    const renderHistory = () => {
        const historyCards = orders.map((order, index) => (
            order.paid ? (
                <div key={index} className="card bg-light border-secondary-subtle crd m-2 shadow-sm" style={{ width: '22rem' }}>
                    <div className="card-header bg-secondary-subtle d-flex justify-content-between align-items-center">
                        <div>
                            <p className="mb-0 fw-bold">₹{order.bill}</p>
                            <small className="text-muted">{order.date}</small>
                        </div>
                        <button 
                            onClick={() => handleViewReview(order.user, order.review)} 
                            type="button" 
                            className="btn btn-outline-danger btn-sm" 
                            data-bs-toggle="modal" 
                            data-bs-target="#reviewModal"
                        >
                            {order.review ? 'Read Review 🖂' : 'No Review'}
                        </button>
                    </div>
                    
                    <div className="card-body p-3">
                        <div className="mb-3 border-bottom pb-2">
                            <h5 className="card-title mb-1">{order.user[0]}</h5>
                            <p className="card-text small text-muted mb-0">Contact: {order.user[1]}</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="dropdown">
                                <button className="btn btn-outline-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    View Items
                                </button>
                                <ul className="dropdown-menu shadow-sm">
                                    {order.items.map((it, idx) => (
                                        <li key={idx}>
                                            <span className="dropdown-item-text small">
                                                {it.quantity}x {it.name} - ₹{it.price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {order.seats && order.seats.length > 0 ? renderSeats(order.seats) : (
                                <span className="badge bg-info text-dark">Takeaway</span>
                            )}
                        </div>
                    </div>
                </div>
            ) : null
        ))

        return (
            <div className='d-flex flex-wrap justify-content-center gap-2 mt-4'>
                {historyCards.length > 0 ? historyCards : <p className="text-muted mt-4">No completed orders found.</p>}
                <ReviewModal />
            </div>
        )
    }

    // --- TAB 2: ALL REVIEWS FEED ---
    const renderAllReviews = () => {
        // Filter out orders that don't have a review
        const reviewedOrders = orders.filter(order => order.review && order.paid);

        if (reviewedOrders.length === 0) {
            return <p className="text-center text-muted mt-5">No reviews have been left yet.</p>;
        }

        return (
            <div className="container mt-4" style={{ maxWidth: '800px' }}>
                <div className="d-flex flex-column gap-3">
                    {reviewedOrders.map((order, index) => (
                        <div key={index} className="card border-light shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{ width: '35px', height: '35px' }}>
                                            {order.user[0].charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">{order.user[0]}</h6>
                                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>{order.date}</small>
                                        </div>
                                    </div>
                                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                                        Verified Order
                                    </span>
                                </div>
                                
                                <p className="card-text text-secondary mb-3 fst-italic">
                                    "{order.review}"
                                </p>

                                <div className="d-flex flex-wrap gap-1 border-top pt-2 mt-2">
                                    <span className="small text-muted me-1">Ordered:</span>
                                    {order.items.map((item, idx) => (
                                        <span key={idx} className="badge bg-light text-dark border fw-normal">
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <Nav dashboard={true} />
            <div className='p-3'>
                <div className='container ms-auto me-auto my-3 p-3 bg-white rounded shadow-sm'>
                    <h3 className='text-center text-danger mb-4 fst-italic'>Orders & Reviews</h3>
                    
                    {/* Bootstrap Nav Tabs */}
                    <ul className="nav nav-tabs justify-content-center" id="dashboardTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button 
                                className={`nav-link ${activeTab === 'history' ? 'active text-danger fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('history')}
                            >
                                Order History
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className={`nav-link ${activeTab === 'reviews' ? 'active text-danger fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Customer Reviews
                            </button>
                        </li>
                    </ul>

                    {/* Render Content Based on Active Tab */}
                    {activeTab === 'history' ? renderHistory() : renderAllReviews()}
                    
                </div>
            </div>
        </>
    )
}

export default RestaurantOrderHistory