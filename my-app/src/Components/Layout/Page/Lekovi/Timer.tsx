import React, { useState, useEffect } from 'react';
import "./Timer.css"
import "./ShopNow.css"
import { useNavigate } from 'react-router-dom';
const Timer = () => {
    // Initialize state
    const navigate = useNavigate();
    const navigateFunction = () => {
        navigate("/LekoviLista");
    }
    const [timeLeft, setTimeLeft] = useState({
        hours: '05',
        minutes: '37',
        seconds: '25',
    });

    useEffect(() => {
        // Set the end time
        const targetTime = new Date().getTime() + 5 * 60 * 60 * 1000 + 37 * 60 * 1000 + 25 * 1000;

        // Update the countdown
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
            } else {
                setTimeLeft({
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0'),
                });
            }
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);
    return (
        <div className='container'>
            <div className='row' style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}>
                <div className='col time-segment mt-1' >
                    <p >{timeLeft.hours}</p>
                    <label>H</label>
                </div>
                <div className="col time-segment mt-1">
                    <p>{timeLeft.minutes}</p>
                    <label>M</label>
                </div>
                <div className="col time-segment mt-1">
                    <p>{timeLeft.seconds}</p>
                    <label>S</label>
                </div>
            </div>
            <div className=''>
                <button onClick = {navigateFunction} className='btn btn-warning mb-4 mt-2 media'>Shop Now</button>
            </div>
        </div>
    );
};

export default Timer;