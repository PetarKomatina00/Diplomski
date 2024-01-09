import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import LekModel from '../../interfaces/LekModel'
import { RootState } from '../../Storage/Redux/store'
import { cartItemModel } from '../../interfaces/cartItemModel'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../Storage/Redux/shoppingCartSlice'
import { useUpdateShoppingCartMutation } from '../../API/shoppingCartApi'
import { useRouteLoaderData } from 'react-router-dom'
import userModel from '../../interfaces/userModel'
function CartSummary() {
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData : userModel = useSelector((state : RootState) => state.userAuthStore);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  )
  if (!shoppingCartFromStore) {
    return <div>Shopping Cart is Empty</div>
  }
  const handleQuantity = (updateQuantityBy : number, cartItem : cartItemModel) => {
    if((updateQuantityBy == -1 && cartItem.kolicina == 1) || updateQuantityBy == 0){
      //Sklanjamo item
      updateShoppingCart({
        lekID : cartItem.lek?.lekID,
        quantity : 0,
        userID : userData.id
      })
      dispatch(removeFromCart({cartItem, quantity : 0})) 
    }
    else{
      //updejtujemo kolicinu
      updateShoppingCart({
        lekID : cartItem.lek?.lekID,
        quantity : updateQuantityBy,
        userID : userData.id
      })
      dispatch(updateQuantity({cartItem, quantity : cartItem.kolicina! + updateQuantityBy}))
    }
  }
  return (
    <div className='container p-4 m-2'>
      <h4 className='text-center text-success'>Cart Summary</h4>
      {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (

        <div
          key = {index}
          style={{ background: 'ghostwhite' }}
          className='d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3'>
          <div className='p-3'>
            <img src={cartItem.lek?.image}
              alt=''
              width={'120px'}
              className='rounded-circle'
            />
           
          </div>
          <p>${cartItem.lek!.price}</p>
          <div className='p-2 mx-3' style={{ width: "100%" }}>
            <div className='d-flex justify content-between align-items-center'>
              <h4 style={{ fontWeight: 300 }}>{cartItem.lek?.nazivLeka}</h4>

              <h4>${(cartItem.kolicina! * cartItem.lek!.price).toFixed(2)}</h4>
            </div>
            <div className='flex-fill'>
              <h4 className='text-danger'>${cartItem.lek!.price}</h4>
            </div>
            <div className='d-flex justify-content-between'>
              <div
                className='d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow'
                style={{ width: "100px", height: "43px" }}>
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i className='bi bi-dash-circle-fill' onClick={() => handleQuantity(-1, cartItem)}></i>
                </span>
                <span>{cartItem.kolicina}</span>
                <span style={{ color: "rgba(22,22,22,.7" }} role="button">
                  <i className='bi bi-plus-circle-fill' onClick={() => handleQuantity(1, cartItem)}></i>
                </span>
              </div>
              <button className='btn btn-danger mx-1' onClick={() => handleQuantity(0, cartItem)}>Remove</button>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}
export default CartSummary