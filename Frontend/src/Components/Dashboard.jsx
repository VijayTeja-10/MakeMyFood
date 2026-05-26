import React, { useContext } from 'react'
import Nav from './Nav'
import { Profile } from './PrivateRoutes'
import LiveTables from './LiveTables'
import LiveOrders from './LiveOrders'

const Dashboard = (props) => {
    const { profile } = useContext(Profile)
    console.log('Manager', profile)

    return (
        <>
            <h1 className='d-flex justify-content-center fst-italic'>Make My Food</h1>
            <Nav dashboard={true} />
            
            {/* Use container-fluid for max screen width usage */}
            <div className='container-fluid mt-3 px-4'>
                <div className='row'>
                    
                    {/* TABLES SECTION: 3 Parts (col-9) */}
                    <div className='col-lg-9 col-md-8 col-sm-12 mb-3'>
                        <div className='border rounded p-3 tables h-100 shadow-sm'>
                            <h3 className='text-center mb-4'>Live Tables</h3>
                            <LiveTables res={profile.resId} /> {/* Ensure you pass res if needed */}
                        </div>
                    </div>
                    
                    {/* ORDERS SECTION: 1 Part (col-3) */}
                    <div className='col-lg-3 col-md-4 col-sm-12 mb-3'>
                        <div className='border rounded p-3 bg-light h-100 shadow-sm'>
                            <h3 className='text-center text-danger mb-4'>Live Orders</h3>
                            <LiveOrders />
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Dashboard