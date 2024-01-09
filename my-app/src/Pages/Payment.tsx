import React from 'react'
import { useLocation } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './Order/OrderSummary';
function Payment() {
  const {
    state: { apiResult, userInput }
  } = useLocation();
  const stripePromise = loadStripe('pk_test_51LDpx9JAtCWImzba47BV4k1KYqnjJos2TQ6y8RAyjFG0w8y3Ic9V3q5vgHO9EHQ04giPMIhwBrgukvTb2Mvk1kGe00cPtngTbA');
  const options = {
    clientSecret: apiResult.clientSecret,
  };
  console.log("The client secret key from payment")
  console.log(options);
  //sk_test_51LDpx9JAtCWImzbav6gDWgXspBAUNuDIl9ETP6IiqHY1lL3NgEmqYxGtXDqrk1Pcj6NkqyXShL3Dg5xhoTTex4Tn00sJdjCg7P
  //pk_test_51LDpx9JAtCWImzba47BV4k1KYqnjJos2TQ6y8RAyjFG0w8y3Ic9V3q5vgHO9EHQ04giPMIhwBrgukvTb2Mvk1kGe00cPtngTbA
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className='container m-5 p-5'>
        <div className='row'>
          <div className='col-md-7'>
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className='col-md-4 offset-md-1'>
            <h3 className='text-success'>Payment</h3>
            <div className='mt-5'>
              <CheckoutForm data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  )
}

export default Payment