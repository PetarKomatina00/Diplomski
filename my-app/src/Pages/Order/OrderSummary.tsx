import React from 'react'
import { orderSummaryProps } from './orderSummaryProps'
import LekModel from '../../interfaces/LekModel'
import { cartItemModel } from '../../interfaces/cartItemModel'
import lekItemApi from '../../API/LekItemApi'

function OrderSummary({ data, userInput, LekIDAndTimesBought }: orderSummaryProps) {
    
    console.log(LekIDAndTimesBought)
    return (
        <div>
            {""}
            <h3 className='text-success'>Order Summary</h3>
            <div className='mt-3'>
                <div className='border py-3 px-2'>{userInput.name}</div>
                <div className='border py-3 px-2'>{userInput.email}</div>
                <div className='border py-3 px-2'>{userInput.phoneNumber}</div>
                <div className='border py-3 px-2'>
                    <h4 className='text-sucess'>Lekovi</h4>
                    <div className='p-3'>
                        {data.cartItems.map((cartItems: any, index: number) => {
                            return (
                                <div className='d-flex' key={index}>
                                    <div className='d-flex w-100 justify-content-between'>
                                        <p>{cartItems.lek?.nazivLeka}</p>
                                        <p>${cartItems.lek?.price} x {cartItems.kolicina}</p>
                                    </div>
                                    <p style={{ width: "70px", textAlign: "right" }}>
                                        $100
                                        </p>
                                </div>
                            )
                        })}
                        <hr />
                        <h4 className='text-danger' style={{ textAlign: "right" }}>
                            $
                            {data.totalPrice.toFixed(2)}
                        </h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary