import React from 'react'
import { useNavigate } from 'react-router-dom'

const Overview = ({ data, setActiveView, handleDelete }) => {
    const nav = useNavigate()

    return (
        <div className="p-4 p-md-5 tables">
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
                <div>
                    <h2 className="fw-bold mb-1">{data.name}</h2>
                    <span className={`badge ${data.isRes ? 'bg-primary' : 'bg-success'} mb-2`}>
                        {data.isRes ? 'Dine-In' : 'Takeaway Store'}
                    </span>
                </div>
                <div className="d-flex gap-2">
                    {/* Switch to Edit View */}
                    <button className="btn btn-outline-dark fw-bold" onClick={() => setActiveView('edit')}>Edit Details</button>
                    <button className="btn btn-danger fw-bold" onClick={handleDelete}>Delete Place</button>
                </div>
            </div>

            <p className="text-secondary fs-5 fst-italic mb-4">"{data.desc}"</p>

            <div className="row mb-4">
                <div className="col-sm-6 mb-2"><strong>Phone:</strong> {data.phone}</div>
                <div className="col-sm-6 mb-2">
                    <strong>Location:</strong> <a href={data.location} target="_blank" rel="noreferrer" className="text-decoration-none">View on Map</a>
                </div>
            </div>

            <hr className="border-secondary opacity-25" />

            <div className="d-flex justify-content-around text-center mt-4 gap-3 flex-wrap">
                
                {/* MENU BUTTON */}
                <button 
                    onClick={() => setActiveView('menu')} 
                    className="btn btn-light border border-warning shadow-sm flex-fill py-3"
                    style={{ transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <h3 className="fw-bold text-dark mb-0">{data.menu?.length || 0}</h3>
                    <small className="text-danger text-uppercase fw-bold">Menu Items</small>
                </button>

                {/* TABLES BUTTON */}
                {data.isRes && (
                    <button 
                        onClick={() => setActiveView('tables')} 
                        className="btn btn-light border border-warning shadow-sm flex-fill py-3"
                        style={{ transition: 'transform 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h3 className="fw-bold text-dark mb-0">{data.tables || data.table?.length || 0}</h3>
                        <small className="text-danger text-uppercase fw-bold">Tables & Seats</small>
                    </button>
                )}

                {/* REVIEWS BUTTON (Navigates to new page) */}
                <button 
                    onClick={() => nav('/restaurant/orders')} 
                    className="btn btn-light border border-warning shadow-sm flex-fill py-3"
                    style={{ transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <h3 className="fw-bold text-dark mb-0">{data.reviews || 0}</h3>
                    <small className="text-danger text-uppercase fw-bold">Total Reviews</small>
                </button>

            </div>
        </div>
    )
}

export default Overview