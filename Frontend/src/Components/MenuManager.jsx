import React, { useState } from 'react'
import axiosInstance from './AxiosInstance'

const MenuManager = ({ data, setActiveView, onRefresh }) => {
    // UI State for toggling the form
    const [showForm, setShowForm] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    
    // Form Data State
    const [itemData, setItemData] = useState({
        item: "",
        image: "",
        desc: "",
        price: "",
        inStock: true,
        restaurant: data.id // Automatically tie to current restaurant
    })

    const Instock = (stock) => {
        return stock ? <span className="badge bg-success ms-2">In Stock</span> : <span className="badge bg-danger ms-2">Out of Stock</span>
    }

    const deleteMenu = async (id) => {
        if(window.confirm("Delete this menu item?")) {
            try {
                await axiosInstance.delete(`/menu/${id}/`)
                onRefresh()
            } catch(e) { console.log(e) }
        }
    }

    // --- FORM HANDLERS ---
    const openAddForm = () => {
        setItemData({
            item: "", image: "", desc: "", price: "", inStock: true, restaurant: data.id
        })
        setIsEditMode(false)
        setShowForm(true)
    }

    const openEditForm = (existingItem) => {
        setItemData(existingItem) // Pre-fill with existing data
        setIsEditMode(true)
        setShowForm(true)
    }

    // Unified submit handler for both POST (Add) and PATCH (Edit)
    const handleSave = async (e) => {
        e.preventDefault()
        try {
            if (isEditMode) {
                await axiosInstance.patch(`/menu/${itemData.id}/`, itemData)
                alert("Item updated successfully!")
            } else {
                await axiosInstance.post(`/menu/`, itemData)
                alert("Item added successfully!")
            }
            onRefresh()
            setShowForm(false) // Close form on success
        } catch(e) { 
            console.log(e)
            alert("An error occurred while saving the item.")
        }
    }

    // --- CONDITIONAL RENDER: FORM VIEW ---
    if (showForm) {
        return (
            <div className='p-4 bg-secondary-subtle rounded'>
                <h3 className="mb-4 text-center fw-bold text-dark">{isEditMode ? 'Edit Menu Item' : 'Add New Item'}</h3>
                <form onSubmit={handleSave} className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <div className="row">
                        <div className="col-md-8 mb-3">
                            <label className="form-label fw-semibold">Item Name</label>
                            <input type="text" className="form-control" required value={itemData.item} onChange={(e) => setItemData({ ...itemData, item: e.target.value })} placeholder="e.g. Chicken Dum Biryani" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-semibold">Price (₹)</label>
                            <input type="number" className="form-control" required value={itemData.price} onChange={(e) => setItemData({ ...itemData, price: e.target.value })} placeholder="0.00" />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label fw-semibold">Image URL</label>
                            <input type="url" className="form-control" value={itemData.image} onChange={(e) => setItemData({ ...itemData, image: e.target.value })} placeholder="https://example.com/image.jpg" />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label fw-semibold">Description</label>
                            <textarea className="form-control" rows="3" required value={itemData.desc} onChange={(e) => setItemData({ ...itemData, desc: e.target.value })} placeholder="Describe the dish..."></textarea>
                        </div>
                        <div className="col-md-12 mb-3 form-check form-switch d-flex align-items-center ms-2">
                            <input type="checkbox" className="form-check-input me-3 fs-5" checked={itemData.inStock} onChange={(e) => setItemData({ ...itemData, inStock: e.target.checked })} style={{ cursor: 'pointer' }} />
                            <label className="form-check-label fw-bold text-secondary">
                                {itemData.inStock ? "Item is Currently In Stock" : "Mark as Out of Stock"}
                            </label>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-end mt-4">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        <button type="submit" className="btn btn-success fw-bold">{isEditMode ? 'Save Changes' : 'Add Item'}</button>
                    </div>
                </form>
            </div>
        )
    }

    // --- CONDITIONAL RENDER: LIST VIEW ---
    return (
        <div className='p-4 bg-secondary-subtle rounded'>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                <button className="btn btn-outline-dark fw-bold" onClick={() => setActiveView('overview')}>Back</button>
                <h3 className="fw-bold mb-0">Manage Menu</h3>
                <button className="btn btn-warning fw-bold" onClick={openAddForm}>+ Add Item</button>
            </div>
            
            <div className="d-flex flex-wrap justify-content-center">
                {data.menu && data.menu.length > 0 ? data.menu.map((item, index) => (
                    <div key={index} className="card d-flex justify-content-center m-3 fcrd shadow-sm bg-white" style={{ maxWidth: '700px', width: '100%' }}>
                        <div className="row g-0">
                            {item.Rname ? (<h5 className='text-center mt-2'>{item.Rname}</h5>) : null}
                            <div className="d-flex justify-content-center align-items-center col-md-4 p-2 me-auto">
                                <img src={item.image} className="card-img object-fit-cover border rounded fim m-3" style={{ maxHeight: '180px' }} alt={item.item} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title fw-bold text-danger">{item.item}</h5>
                                        <div className="dropdown">
                                            <button className="btn btn-sm btn-outline-success" data-bs-toggle="dropdown">Actions</button>
                                            <ul className="dropdown-menu">
                                                <li><button className="dropdown-item" onClick={() => openEditForm(item)}>Edit Item</button></li>
                                                <li><button className="dropdown-item text-danger" onClick={() => deleteMenu(item.id)}>Delete Item</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column mt-2">
                                        <p className="card-text mb-2 text-secondary">{item.desc}</p>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <p className="card-text mb-0"><small className="fw-bold fs-6">Price : ₹{item.price}</small></p>
                                            {Instock(item.inStock)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-muted mt-5 text-center w-100">No menu items found. Click "+ Add Item" to get started.</p>}
            </div>
        </div>
    )
}

export default MenuManager