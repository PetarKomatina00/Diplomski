import React from 'react'
import CartSummary from './Cart/CartSummary'
import UserDetails from './Cart/UserDetails'
import withAuth from '../HOC/withAuth'

function ShoppingCart() {
  return (
    <div className='row w-100' style = {{marginTop : "10px"}}>
        <div className='col-lg-6 col-12' style={{fontWeight : 300}}>
            <CartSummary/>
        </div>
        <div className='col-lg-6 col-12 p-4'>
            <UserDetails/>
        </div>
    </div>
  )
}
export default withAuth(ShoppingCart)