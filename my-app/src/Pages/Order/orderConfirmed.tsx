import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../Components/Layout/Page/Lekovi/Common/MainLoader';
const calculateTimeLeft = (number: number) => {
    if(number > 0){
        number --;
    }
    return number;
}
const OrderConfirmed = () => {
    const [timeLeft, setTimeIsLeft] = useState(calculateTimeLeft(10));
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeIsLeft(calculateTimeLeft(timeLeft));
        }, 1000)
    }, [timeLeft])
    if (timeLeft == 0) {
        navigate("/")
    }
    return (
        <div className='w-100 text-center d-flex justify-content-center align-items-center'>
            <div>
                <i style={{ fontSize: "7rem" }} className='bi bi-check2-circle text-success'>
                </i>
                <div className='pb-5'>
                    <h2 className='text-success'>Order has been Confirmed</h2>
                    <h2 className='mt-3'>Your order ID: XX</h2>
                    <p>TEST TEST</p>
                    <p>You will be redirected in {timeLeft}.</p>
                    <img src="" style={{ width: "40px", borderRadius: "30px" }}></img>
                </div>
            </div>

        </div>
    )
}

export default OrderConfirmed