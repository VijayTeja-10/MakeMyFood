import React, { useContext, useState, useEffect } from 'react'
import { Profile } from './PrivateRoutes'
import axiosInstance from './AxiosInstance'
import RestaurantDashboard from './RestaurantDashboard'
import RestaurantForm from './RestaurantForm'
import Nav from './Nav'


const Restaurant = (props) => {
    const { profile } = useContext(Profile)
    const [isValid, setValid] = useState(false)
    const [resData, setRD] = useState({})
    const [loading, setLoading] = useState(true)

    const validate = async () => {
        if (!profile || !profile.id) return;
        try {
            const response = await axiosInstance.post('/restaurants/PullDetails/', { "manager": profile.id })
            if (response.data && response.data.name !== '') {
                setValid(true)
                setRD(response.data)
            } else {
                setValid(false)
            }
        } catch (error) {
            console.log("No existing setup found or error fetching.", error)
            setValid(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        validate()
    }, [profile])

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border text-info"></div></div>
    }

    // Conditional Rendering: Show Dashboard if data exists, otherwise show Registration Form
    return isValid ? (
        <>
        <Nav dashboard={true} />
        <RestaurantDashboard data={resData} profile={profile} onRefresh={validate} />
        </>
    ) : (
        <>
        <Nav dashboard={true} />
        <RestaurantForm profile={profile} onSuccess={validate} />
        </>
    )
}

export default Restaurant