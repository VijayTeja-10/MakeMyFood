import React, { useState } from 'react';

const ArrivalModal = ({ 
    orderStatus, 
    arrivalMins, 
    setArrivalMins, 
    confirmOrderRequest, 
    closePaymentModal 
}) => {
    // 1. Add state to track the validation error
    const [errorMsg, setErrorMsg] = useState('');

    // 2. Create a handler to validate before confirming
    const handleConfirmClick = () => {
        const mins = parseInt(arrivalMins, 10);
        
        // Check if empty or less than 10
        if (isNaN(mins) || mins < 10) {
            setErrorMsg('Arrival time must be at least 10 minutes.');
            return;
        }
        
        // If valid, clear error and proceed
        setErrorMsg('');
        confirmOrderRequest();
    };

    return (
        <div className="modal fade" id="arrivalModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="arrivalModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="arrivalModalLabel">Confirm Arrival Time</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closePaymentModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center p-4">
                        
                        {orderStatus === '' && (
                            <>
                                <label className="form-label fw-semibold">Estimated Arrival Time (in minutes):</label>
                                <input 
                                    type="number" 
                                    // Add Bootstrap's is-invalid class dynamically if there's an error
                                    className={`form-control text-center mx-auto ${errorMsg ? 'is-invalid' : ''}`} 
                                    style={{ maxWidth: '150px' }} 
                                    value={arrivalMins} 
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        
                                        // Clear the error message as soon as the user starts typing again
                                        if (errorMsg) setErrorMsg('');
                                        
                                        // Allow empty string so the user can backspace freely
                                        if (val === '') {
                                            setArrivalMins('');
                                            return;
                                        }
                                        
                                        // Parse the number and cap it at 60
                                        const num = parseInt(val, 10);
                                        
                                        if (num > 60) {
                                            setArrivalMins(60);
                                        } else {
                                            setArrivalMins(num);
                                        }
                                    }} 
                                    min="10" 
                                    max="60" 
                                />
                                {/* 3. Conditionally render the error or the standard helper text */}
                                {errorMsg ? (
                                    <div className="text-danger mt-2 fw-semibold">{errorMsg}</div>
                                ) : (
                                    <div className="form-text mt-2">Time must be between 10 and 60 minutes.</div>
                                )}
                            </>
                        )}

                        {orderStatus === 'waiting' && (
                            <div>
                                <div className="spinner-border text-danger mb-3" role="status"></div>
                                <h5>Waiting for Restaurant...</h5>
                                <p className="text-muted small">Please do not close this window.</p>
                            </div>
                        )}

                        {orderStatus === 'confirmed' && (
                            <div className="text-success">
                                <h2 className="mb-2">✓</h2>
                                <h5>Order Confirmed!</h5>
                                <p className="text-muted small">The restaurant has accepted your order.</p>
                            </div>
                        )}

                        {orderStatus === 'declined' && (
                            <div className="text-danger">
                                <h2 className="mb-2">✕</h2>
                                <h5>Order Declined</h5>
                                <p className="text-muted small">The restaurant is currently unable to accept this order.</p>
                            </div>
                        )}

                    </div>
                    <div className="modal-footer">
                        {/* 4. Swap out confirmOrderRequest for our new validation handler */}
                        {orderStatus === '' && (
                            <button type="button" onClick={handleConfirmClick} className="btn btn-success w-100">Confirm Order</button>
                        )}
                        {(orderStatus === 'confirmed' || orderStatus === 'declined') && (
                            <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal" onClick={closePaymentModal}>Close</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArrivalModal