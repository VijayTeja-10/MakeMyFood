import React, { useState } from 'react'
import axiosInstance from './AxiosInstance'

const EditDetails = ({ data, setActiveView, onRefresh }) => {
    const [editData, setEditData] = useState(data)
    const [error, setError] = useState({})

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.patch(`/registration/${data.id}/`, editData)
            alert("Restaurant details updated successfully!")
            setActiveView('overview') // Return to overview on success
            onRefresh() 
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data) setError(err.response.data)
        }
    }

    return (
        <div className='p-4'>
            <h3 className="mb-4 text-center fw-bold text-dark">Edit Details</h3>
            <form onSubmit={handleUpdate}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Restaurant Name</label>
                        <input type="text" className="form-control" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        <small className="text-danger">{error.name}</small>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <input type="text" className="form-control" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                        <small className="text-danger">{error.phone}</small>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea className="form-control" rows="3" value={editData.desc} onChange={(e) => setEditData({ ...editData, desc: e.target.value })}></textarea>
                        <small className="text-danger">{error.desc}</small>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Location URL</label>
                        <input type="url" className="form-control" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Image URL</label>
                        <input type="url" className="form-control" value={editData.image} onChange={(e) => setEditData({ ...editData, image: e.target.value })} />
                    </div>
                    <div className="col-md-12 mb-3 form-check form-switch d-flex align-items-center">
                        <input type="checkbox" className="form-check-input ms-1 me-3 fs-5" checked={editData.isRes} onChange={(e) => setEditData({ ...editData, isRes: e.target.checked })} />
                        <label className="form-check-label fw-bold text-secondary">
                            {editData.isRes ? "Dine-in (Restaurant)" : "Takeaway (Retail store)"}
                        </label>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary" onClick={() => setActiveView('overview')}>Cancel</button>
                    <button type="submit" className="btn btn-success">Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditDetails