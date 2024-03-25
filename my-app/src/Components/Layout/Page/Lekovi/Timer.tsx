import React, { useState, useEffect } from 'react';
import "./Timer.css"
import "./ShopNow.css"
import { useFetcher, useNavigate } from 'react-router-dom';
import { clearInterval } from 'timers';
import { useTimer } from './Common/TimerProvider';
const Timer = () => {
    // Initialize state
    const navigate = useNavigate();
    const navigateFunction = () => {
        navigate("/LekoviLista");
    }

    let { timeInSeconds, setTimeInSeconds }: any = useTimer();
    const [timeInMinutes, setTimeInMinutes] = useState<number>(5)
    const [timeInHours, setTimeInHours] = useState<number>(3)
    const [timeInDays, setTimeInDays] = useState<number>(74)

    const timer = localStorage.getItem("timer")
    //localStorage.removeItem("timer");

    useEffect(() => {
        setTimeInDays((timeInSeconds / (60 * 60 * 24)))
        setTimeInHours((timeInSeconds % (60 * 60 * 24) / (60 * 60)))
        setTimeInMinutes((timeInSeconds % 3600) / 60)
    }, [])
    useEffect(() => {
        if(timeInSeconds === 0){
            console.log("USLO")
            setTimeInMinutes(timeInMinutes - 1)
        }
        if(timeInMinutes === 0){
            setTimeInMinutes(59)
            setTimeInHours(timeInHours - 1)
        }
        if(timeInHours === 0){
            setTimeInHours(59)
            setTimeInDays(timeInDays - 1)
        }

    }, [timeInSeconds])


    return (
        <div className='container'>
            <div className='row' style={{ marginLeft: "auto", marginRight: "auto", width: "60%" }}>
                <div>
                    DISCOUNT FOR EASTER. HURRY UP!
                </div>
                <div className='col time-segment mt-1' >
                    {/* <p >{timeLeft.hours}</p> */}
                    <p>{timeInDays.toFixed(0)}</p>
                    <label>D</label>
                </div>
                <div className='col time-segment mt-1' >
                    {/* <p >{timeLeft.hours}</p> */}
                    <p>{timeInHours.toFixed(0)}</p>
                    <label>H</label>
                </div>
                <div className="col time-segment mt-1">
                    {/* <p>{timeLeft.minutes}</p> */}
                    <p>{timeInMinutes.toFixed(0)}</p>
                    <label>M</label>
                </div>
                <div className="col time-segment mt-1">
                    {/* <p>{timeLeft.seconds}</p> */}
                    <p>{timeInSeconds % 60}</p>
                    <label>S</label>
                </div>
            </div>
            <div className=''>
                <button onClick={navigateFunction} className='btn btn-warning mb-4 mt-2 media'>Shop Now</button>
            </div>
        </div>
    );
};

export default Timer;