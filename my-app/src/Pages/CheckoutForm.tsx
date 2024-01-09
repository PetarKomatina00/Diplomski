import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toastNotify from '../Helper/toastNotify';
import { orderSummaryProps } from './Order/orderSummaryProps';
import { cartItemModel } from '../interfaces/cartItemModel';
import { useCreateOrderMutation } from '../API/orderApi';
import apiResponse from '../interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    let grandTotal = 0;
    let totalItems = 0;
    const orderDetailsDTO: any = [];
    data.cartItems.forEach((item: any) => {
      const tempOrderDetail: any = {};
      tempOrderDetail["lekID"] = item.lek?.lekID
      tempOrderDetail["kolicina"] = item.kolicina
      tempOrderDetail["nazivLeka"] = item.lek?.nazivLeka
      tempOrderDetail["price"] = item.lek?.price
      orderDetailsDTO.push(tempOrderDetail)
      grandTotal += (item.kolicina! * item.lek?.price!)
      totalItems += item.kolicina!;
    })
    const myOrder = {
      pickupName: userInput.name,
      pickupPhoneNumber: userInput.phoneNumber,
      pickupEmail: userInput.email,
      applicationUserID: data.userID,
      orderTotal: grandTotal,
      stripePaymentID: data.stripePaymentID,
      status: "CONFIRMED",
      totalItems: totalItems,
      orderDetailsDTO: orderDetailsDTO
    }
    const response: apiResponse = await createOrder({
      pickupName: userInput.name,
      pickupPhoneNumber: userInput.phoneNumber,
      pickupEmail: userInput.email,
      applicationUserID: data.userID,
      orderTotal: grandTotal,
      stripePaymentID: data.stripePaymentID,
      status: "CONFIRMED",
      totalItems: totalItems,
      orderDetailsDTO: orderDetailsDTO,
    })
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/OrderConfirmed"
      },
    });
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className='btn btn-success mt-5 w-100'>Submit</button>
    </form>
  );
};
export default CheckoutForm;