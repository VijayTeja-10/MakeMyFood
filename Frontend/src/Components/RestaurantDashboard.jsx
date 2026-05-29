import React, { useState } from 'react'
import axiosInstance from './AxiosInstance'
import Overview from './Overview'
import EditDetails from './EditDetails'
import MenuManager from './MenuManager'
import TableManager from './TableManager'

const RestaurantDashboard = ({ data, profile, onRefresh }) => {
    // This single state controls which screen is visible
    const [activeView, setActiveView] = useState('overview') 

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this setup? This action cannot be undone.")
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/registration/${data.id}/`)
                alert("Setup deleted successfully.")
                window.location.reload() 
            } catch (err) {
                console.log(err)
                alert("Failed to delete setup.")
            }
        }
    }

    return (
        <div className='container mt-5 p-0 rounded shadow overflow-hidden tables bg-white' style={{ maxWidth: activeView === 'overview' || activeView === 'edit' ? '800px' : '900px' }}>
            
            {/* Header Image only shows on the overview */}
            {activeView === 'overview' && (
                <div 
                    style={{ 
                        height: '250px', 
                        backgroundImage: `url(${data.image || 'https://via.placeholder.com/800x250?text=No+Image+Provided'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
            )}
            
            {/* Component Routing based on activeView state */}
            {activeView === 'overview' && <Overview data={data} setActiveView={setActiveView} handleDelete={handleDelete} />}
            
            {activeView === 'edit' && <EditDetails data={data} setActiveView={setActiveView} onRefresh={onRefresh} />}
            
            {activeView === 'menu' && <MenuManager data={data} setActiveView={setActiveView} onRefresh={onRefresh} />}
            
            {activeView === 'tables' && <TableManager data={data} setActiveView={setActiveView} onRefresh={onRefresh} />}
            
        </div>
    )
}

export default RestaurantDashboard