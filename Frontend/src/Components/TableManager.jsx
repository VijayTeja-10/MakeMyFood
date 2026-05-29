import React from 'react'
import axiosInstance from './AxiosInstance'

const TableManager = ({ data, setActiveView, onRefresh }) => {

    // --- ADD HANDLERS (Auto-Calculating Next Value) ---
    const handleAddTable = async () => {
        const nextTableNum = data.table && data.table.length > 0 
            ? Math.max(...data.table.map(t => t.val)) + 1 
            : 1;
        
        if(!data.id) return;
        try {
            await axiosInstance.post(`/table/AddTable/`, {"val": nextTableNum, "restaurant": data.id})
            onRefresh()
        } catch(e) { console.log(e) }
    }

    const handleAddSeat = async (table) => {
        const nextSeatNum = table.seat && table.seat.length > 0
            ? Math.max(...table.seat.map(s => s.val)) + 1
            : 1;

        if(!table.id) return;
        try {
            await axiosInstance.post(`/seatpoll/`, {"val": nextSeatNum, "table": table.id})
            onRefresh()
        } catch(e) { console.log(e) }
    }

    // --- POP (DELETE) SEAT HANDLER ---
    const handlePopSeat = async (table) => {
        if (!table.seat || table.seat.length === 0) return;

        // 1. Find all seats that are NOT occupied
        const emptySeats = table.seat.filter(s => !s.occupied);

        // 2. If no empty seats exist, abort
        if (emptySeats.length === 0) {
            alert("All seats are currently occupied. Cannot delete a seat right now.");
            return;
        }

        // 3. Find the empty seat with the highest 'val' (simulates pop())
        const seatToDelete = emptySeats.reduce((prev, current) => (prev.val > current.val) ? prev : current);

        if(window.confirm(`Are you sure you want to remove Seat ${seatToDelete.val}?`)) {
            try {
                await axiosInstance.delete(`/seatpoll/${seatToDelete.id}/`)
                onRefresh()
            } catch(e) { console.log(e) }
        }
    }
    
    // --- RENDER SEATS ---
    const renderSeats = (t) => {
        return t.seat.map((sit, index) => (
            <button 
                key={index} 
                className={`btn p-3 ${sit.occupied ? 'btn-danger' : 'btn-outline-danger'} text-center m-2`}
                disabled // Visually static since deletion now happens via the header button
                style={{ minWidth: '80px' }}
                title={sit.occupied ? "Seat is occupied" : "Seat is empty"}
            >
                Seat {sit.val}
            </button>
        ))
    }

    return (
        <div className='p-4 tables rounded'>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4 flex-wrap gap-2">
                {/* Back Button */}
                <button className="btn btn-outline-dark fw-bold" onClick={() => setActiveView('overview')}>Back</button>
                <h3 className="fw-bold mb-0">Manage Tables</h3>
                
                {/* Auto-Add Table Button */}
                <button className="btn btn-success fw-bold" onClick={handleAddTable}>+ Add Table</button>
            </div>

            <div className='d-flex flex-wrap justify-content-center'>
                {data.table && data.table.length > 0 ? data.table.map((table, index) => (
                    <div key={index} className="d-flex flex-column align-items-center tab flex-wrap m-3 p-3 bg-light border rounded shadow-sm" style={{ minWidth: '250px' }}>
                        
                        {/* TABLE HEADER WITH POP SEAT ACTION */}
                        <div className="w-100 d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                            <div className="fw-bold text-danger fs-5">Table {table.val}</div>
                            
                            {/* Pop Seat Button */}
                            <button 
                                className="btn btn-sm btn-warning fw-bold" 
                                onClick={() => handlePopSeat(table)}
                                disabled={!table.seat || table.seat.length === 0}
                                title="Remove last empty seat"
                            >
                                - Seat
                            </button>
                        </div>

                        <div className="d-flex justify-content-around flex-wrap w-100 mb-2">
                            {renderSeats(table)}
                        </div>
                        
                        {/* Auto-Add Seat Button */}
                        <button className="btn btn-sm btn-outline-success mt-2 w-100 fw-bold" onClick={() => handleAddSeat(table)}>
                            + Add Seat
                        </button>
                    </div>
                )) : <p className="text-muted mt-5 text-center">No tables found. Click "+ Add Table" to start.</p>}
            </div>
        </div>
    )
}

export default TableManager