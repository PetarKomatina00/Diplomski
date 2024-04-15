import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toastNotify from '../Helper/toastNotify';
import { orderSummaryProps } from './Order/orderSummaryProps';
import { cartItemModel } from '../interfaces/cartItemModel';
import { useCreateOrderMutation } from '../API/orderApi';
import apiResponse from '../interfaces/apiResponse';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateTimesBoughtMutation } from '../API/LekItemApi';
import { useTimer } from '../Components/Layout/Page/Lekovi/Common/TimerProvider';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../Storage/Redux/shoppingCartSlice';
import { RootState } from '../Storage/Redux/store';

const CheckoutForm = ({ data, userInput, LekIDAndTimesBought }: orderSummaryProps) => {
  const dispatch = useDispatch();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  )
  const discount = localStorage.getItem("discount");
  let newValue = 0;
  if (discount != null) {
    newValue = data.totalPrice - data.totalPrice * parseInt(discount) / 100;
  }
  const { timeInSeconds, setTimeInSeconds } = useTimer();
  //console.log(timeInSeconds);
  const steps = localStorage.getItem("steps");
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [updateTimesBought] = useUpdateTimesBoughtMutation();

  useEffect(() => {
    console.log(shoppingCartFromStore.map((x) => {
      console.log(x);
    }));
  }, [shoppingCartFromStore])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!stripe || !elements) {
      return;
    }
    let grandTotal = 0;
    let totalItems = 0;
    const orderDetailsDTO: any = [];
    console.log(data);
    data.cartItems.forEach((item: any) => {
      const tempOrderDetail: any = {};
      tempOrderDetail["lekID"] = item.lek?.lekID
      tempOrderDetail["kolicina"] = item.kolicina
      tempOrderDetail["nazivLeka"] = item.lek?.nazivLeka
      tempOrderDetail["price"] = item.lek?.price
      orderDetailsDTO.push(tempOrderDetail)
      grandTotal += (item.kolicina! * item.lek?.price!) - data.totalPrice * parseInt(discount!) / 100;
      totalItems += item.kolicina!;
    })
    //console.log(data.cartItems)
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
    let response2: any = await updateTimesBought({ data: LekIDAndTimesBought })
    console.log(response2);
    if (response2.isSuccess) {
      console.log("Uspesno updejtovano timesboughtid")
    }

    const response3 = await fetch('https://diplomskiapi.azurewebsites.net/api/auth/Steps/' + userInput.email + "/" + 0, {
      method: "PUT"
    })
    if (response3.ok) {
      console.log("uspesno promenjeni koraci");
    }

    localStorage.setItem("timer", timeInSeconds.toString())
    localStorage.removeItem("discount");
    setIsProcessing(false);
    console.log()
    dispatch(clearCart(shoppingCartFromStore));
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/OrderConfirmed"
      },
    });

  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className='btn btn-success mt-5 w-100'>Submit</button>
    </form>
  );
};
export default CheckoutForm