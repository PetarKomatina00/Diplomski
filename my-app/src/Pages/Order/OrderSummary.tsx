import React from 'react'
import { orderSummaryProps } from './orderSummaryProps'
import LekModel from '../../interfaces/LekModel'
import { cartItemModel } from '../../interfaces/cartItemModel'
import lekItemApi from '../../API/LekItemApi'

function OrderSummary({ data, userInput, LekIDAndTimesBought }: orderSummaryProps) {

    //console.log(LekIDAndTimesBought)
    const discount = localStorage.getItem("discount");
    let newValue = 0;
    if(discount != null && discount != "0"){
        newValue = data.totalPrice - data.totalPrice * parseInt(discount) / 100;
    }
    const checkIfDiscountExists = (newValue != data.totalPrice && discount != "0")
    return (
        <div>
            {""}
            <h3 className='text-success'>Order Summary</h3>
            <div className='mt-3'>
                <div className='border py-3 px-2'>{userInput.name}</div>
                <div className='border py-3 px-2'>{userInput.email}</div>
                <div className='border py-3 px-2'>{userInput.phoneNumber}</div>
                <div className='border py-3 px-2'>
                    <h4 className='text-success'>Supplements</h4>
                    <div className=''>
                        {data.cartItems.map((cartItems: any, index: number) => {
                            return (
                                <div className='d-flex' key={index}>
                                    <div className='d-flex w-100 justify-content-between'>
                                        <p>{cartItems.lek?.nazivLeka}</p>
                                        <p>${cartItems.lek?.price} x {cartItems.kolicina}</p>
                                    </div>
                                    {/* <p style={{ width: "70px", textAlign: "right" }}>
                                        $100
                                    </p> */}
                                </div>
                            )
                        })}
                        <hr />
                            <>
                                <h4 style={{ textAlign: "left" }}>
                                    {checkIfDiscountExists ? <h4 className='text-success'>Discount for number of steps</h4>: <h4 className='text-success'>Price</h4>}
                                </h4>
                                <h4 className='text-danger' style={{ textAlign: "right", textDecoration: discount != "0" ? "line-through" : "none"}}>
                                    {<p className={checkIfDiscountExists ? "text-danger" : "text-success"}>${data.totalPrice.toFixed(2)}</p>}
                                </h4>
                                {checkIfDiscountExists && (
                                    <h4 className='text-success' style={{ textAlign: "right" }}>
                                    $
                                    {newValue.toFixed(2)}
                                </h4>
                                )}   
                            </>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary