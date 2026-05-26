import React, { useEffect, useState, useContext } from 'react'
import axiosInstance from './AxiosInstance'
import { Profile } from './PrivateRoutes'

const LiveTables = (props) => {
    const { profile } = useContext(Profile)
    const [tables, setTables] = useState([])

    const fetchTables = async () => {
        // Fallback check in case props.res is undefined on initial load
        if (!props.res) return; 
        try {
            const res = await axiosInstance.get(`/restaurants/${props.res}/`)
            setTables(res.data.table)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTables();
        const inter = setInterval(fetchTables, 3000)
        return () => clearInterval(inter)
    }, [props.res])

    const occ = (s) => {
        if (!s.occupied) {
            return 'btn-outline-danger'
        } else {
            return 'btn-danger'
        }
        // return 'btn-danger disabled'
    }

    const booking = async (s, t) => {
        try {
            const res = await axiosInstance.get(`/seatpoll/${s.id}/`)
            if (!res.data.occupied) {
                await axiosInstance.patch(`/seatpoll/${s.id}/`, { "occupied": true, uid: profile.id })
                console.log(`Table ${t.val} Seat ${s.val} booked!`, res)
            } else if (res.data.occupied) {
                await axiosInstance.patch(`/seatpoll/${s.id}/`, { "occupied": false,uid:null })
            }
        } catch (error) {
            console.log(error)
        } finally {
            fetchTables();
        }
    }

    const renderSeats = (t) => {
        return t.seat.map((sit, index) => (
            <button 
                key={index} 
                onClick={() => { booking(sit, t) }} 
                className={`btn p-3 ${occ(sit)} text-center col-sm cols-2 m-3`}
            >
                seat {sit.val}
            </button>
        ))
    }

    const renderTables = () => {
        return tables.map((table, index) => (
            <div key={index} className="d-flex flex-column align-items-center tab flex-wrap m-2 p-2 bg-white border rounded">
                <div className="fw-bold text-muted mb-2">Table {table.val || index + 1}</div>
                <div className="d-flex justify-content-around flex-wrap">
                    {renderSeats(table)}
                </div>
            </div>
        ))
    }

    return (
        <div className='d-flex flex-wrap tables justify-content-center'>
            {renderTables()}
        </div>
    )
}

export default LiveTables