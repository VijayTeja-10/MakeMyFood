import React, { useContext, useState, useEffect } from 'react'
import { Profile } from './PrivateRoutes'
import axiosInstance from './AxiosInstance'

const RestaurantForm = ({ profile, onSuccess }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [pin, setPin] = useState('')
    const [gstId, setGstId] = useState('')
    const [isRes, setIsRes] = useState(false)
    const [error, setError] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        const restaurantData = {
            name, email, phone, desc, location, isRes, pincode: pin, gstId, manager: profile?.id,
            image: image || null,
        }

        try {
            await axiosInstance.post('/register/', restaurantData)
            setError({})
            alert('Your setup has been registered successfully!')
            onSuccess() // Trigger the orchestrator to fetch and show the dashboard
        } catch (errors) {
            if (errors.response && errors.response.data) setError(errors.response.data)
            console.log(errors)
        }
    }

    return (
        <div className='d-flex container justify-content-center mt-5 p-3 p-md-5'>
            <form className='bg-secondary-subtle p-4 p-md-5 rounded min-w-50 w-100' style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
                <h4 className='text-center mb-4'>Register your restaurant/Store</h4>
                
                <div className="mb-3">
                    <label className="form-label">Restaurant Name</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} placeholder="e.g. Royal Dum Biryani" />
                    <small className="text-danger">{error.name}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="name@restaurant.com" />
                    <small className="text-danger">{error.email}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="XXXXXXXXXX" />
                    <small className="text-danger">{error.phone}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">GST ID</label>
                    <input type="text" className="form-control" onChange={(e) => setGstId(e.target.value)} value={gstId} placeholder="15-digit GSTIN" />
                    <small className="text-danger">{error.gstId}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="text" className="form-control" onChange={(e) => setPin(e.target.value)} value={pin} placeholder="Postal Code" />
                    <small className="text-danger">{error.pincode}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Location (Maps URL)</label>
                    <input type="url" className="form-control" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="http://maps.google.com/..." />
                    <small className="text-danger">{error.location}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Display Image URL</label>
                    <input type="url" className="form-control" onChange={(e) => setImage(e.target.value)} value={image} placeholder="https://example.com/image.jpg" />
                    <small className="text-danger">{error.image}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description / Bio</label>
                    <textarea className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} rows="3" placeholder="Tell customers about your kitchen..."></textarea>
                    <small className="text-danger">{error.desc}</small>
                </div>

                <div className="mb-4 form-check form-switch bg-white p-3 rounded border mx-0 d-flex align-items-center">
                    <input type="checkbox" className="form-check-input ms-1 me-3" role="switch" checked={isRes} onChange={(e) => setIsRes(e.target.checked)} style={{ transform: 'scale(1.2)', cursor: 'pointer' }} />
                    <label className="form-check-label fw-bold text-secondary" style={{ cursor: 'pointer' }}>
                        {isRes ? "Dine-in (Restaurant)" : "Takeaway (Retail store)"}
                    </label>
                    <small className="text-danger d-block">{error.isRes}</small>
                </div>

                <button className='btn btn-info my-3 w-100 fw-bold' type="submit">Register Place</button>
            </form>
        </div>
    )
}
export default RestaurantForm