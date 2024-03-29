import React from 'react';
import { Footer, Header } from '../Components/Layout';
import { useState, useEffect } from 'react';
import LekModel from '../interfaces/LekModel';
import Home from '../Pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import LekDetails from '../Pages/LekDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../API/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import ShoppingCart from '../Pages/ShoppingCart';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import userModel from '../interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import AuthenticationTest from '../Pages/AuthenticationTest';
import AuthenticationTestAdmin from '../Pages/AuthenticationTestAdmin';
import AccessDenied from '../Pages/AccessDenied';
import { RootState } from '../Storage/Redux/store';
import Payment from '../Pages/Payment';
import OrderConfirmed from "../Pages/Order/orderConfirmed"
import SviLekovi from '../Pages/Lekovi/SviLekovi';
import Upsert from '../Pages/Lekovi/Upsert';
import Obrisi from '../Pages/Lekovi/Obrisi';
import LekoviLista from '../Components/Layout/Page/Lekovi/LekoviLista';
import { TimerProvider } from '../Components/Layout/Page/Lekovi/Common/TimerProvider';

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetShoppingCartQuery(userData.id, { skip: skip })
  useEffect(() => {
    const localToken = localStorage.getItem("token")
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken)
      dispatch(setLoggedInUser({ fullName, id, email, role }))
    }
  }, [])
  //console.log(data);
  useEffect(() => {
    if (!isLoading && data !== undefined) {
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [data])

  useEffect(() => {
    if (userData.id) setSkip(false)
  }, [userData])
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0)
  const [timeInMinutes, setTimeInMinutes] = useState<number>(0)
  const [timeInHours, setTimeInHours] = useState<number>(0)
  useEffect(() => {
    if (timeInSeconds === 60) {
      setTimeInSeconds(0);
      setTimeInMinutes(timeInMinutes + 1)
    }
    if (timeInMinutes === 60) {
      setTimeInHours(timeInHours + 1);
    }
    const timer = setTimeout(() => {
      setTimeInSeconds(timeInSeconds + 1);
    }, 1000)
    return () => clearTimeout(timer);
  })
  return (
    <div>
      <Header />
      <div className='pb-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/LekDetails/:lekID'
            element={<LekDetails />} />
          <Route path='/shoppingCart' element={<ShoppingCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/authentication' element={<AuthenticationTest />} />
          <Route path='/authorization' element={<AuthenticationTestAdmin />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/orderConfirmed' element={<OrderConfirmed />} />
          <Route path='/Lekovi/SviLekovi' element={<SviLekovi />} />
          <Route path='/Lekovi/Upsert/:id' element={<Upsert />} />
          <Route path='/Lekovi/Upsert/' element={<Upsert />} />
          <Route path='/Lekovi/Obrisi/:id' element={<Obrisi />} />
          <Route path='/accessDenied' element={<AccessDenied />} />
          <Route path='/LekoviLista' element={<LekoviLista />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
