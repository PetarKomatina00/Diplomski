import React, { useState } from 'react'
import { useGetLekByIDQuery } from '../API/LekItemApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../API/shoppingCartApi';
import MainLoader from '../Components/Layout/Page/Lekovi/Common/MainLoader';
import MiniLoader from '../Components/Layout/Page/Lekovi/Common/MiniLoader';
import apiResponse from '../interfaces/apiResponse';
import toastNotify from '../Helper/toastNotify';
import userModel from '../interfaces/userModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';

// USER ID = 87681a0c-305f-4bc2-a539-990f13ead8a8 - ADMIN
// lekID, quantity, userID
function LekDetails() {
    const { lekID } = useParams()
    const { data, isLoading } = useGetLekByIDQuery(lekID);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [updateShoppingCart] = useUpdateShoppingCartMutation();
    const userData : userModel = useSelector((state : RootState) => state.userAuthStore);
    
    const loadingDiv = <div className='d-flex justify-content-center' style={{ width: "100%" }}>
        <div>Loading...</div>
    </div>
    const handleQuantity = (counter: number) => {
        let newQuantity = quantity + counter;
        if (newQuantity == 0) {
            newQuantity = 1;
        }
        setQuantity(newQuantity)
        return;
    }
    const handleAddToCart = async (lekID: number) => {
        if(!userData.id){
            navigate("/login")
            return;
        }
        setIsAddingToCart(true);
        const response : apiResponse= await updateShoppingCart({
            lekID: lekID,
            quantity: quantity,
            userID: userData.id
        })
        if(response.data && response.data.isSuccess){
            toastNotify("Item added to cart successfully");
        }
        setIsAddingToCart(false);
    }
    return (
        <div className='container pt-4 pt-md-5'>
            {(!isLoading ? (
                <>
                    <div className='row'>
                        <div className='col-7'>
                            <h2 className='text-success'>{data.result?.nazivLeka}</h2>
                            <span>
                                <span
                                    className='badge text-bg-dark pt-2'
                                    style={{ height: "40px", fontSize: "20px" }}
                                >
                                    CATEGORY
                                </span>
                            </span>
                            <span>
                            </span>
                            <p style={{ fontSize: "20px" }} className='pt-2'>
                                {data.result?.description}
                            </p>
                            <span className='h3'>{'$' + data.result?.price}</span> &nbsp; &nbsp; &nbsp;
                            <span className='pb-2 p-3'
                                style={{ border: "1px solid #333", borderRadius: "30px" }}>
                                <i onClick={() => handleQuantity(-1)}
                                    className='bi bi-dash p-1' style={{ fontSize: "25px", cursor: "pointer" }}></i>
                                <span className='h3 mt-3 px-3'>{quantity}</span>
                                <i onClick={() => handleQuantity(+1)}
                                    className='bi bi-plus p-1' style={{ fontSize: "25px", cursor: "pointer" }}></i>
                            </span>
                            <div className='row pt-4'>
                                <div className='col-5'>
                                    {isAddingToCart ? (
                                        <button disabled className='btn btn-success form-control'>
                                            <MiniLoader />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(data.result?.lekID)}
                                            className='btn btn-success form-control'>
                                            Add to cart
                                        </button>
                                    )}
                                </div>
                                <div className='col-5'>
                                    <button className='btn btn-secondary form-control'
                                        onClick={() => navigate(-1)}>
                                        Back to home
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-5'>
                            <img src={data.result.image}
                                width="100%"
                                style={{ borderRadius: "50%" }}
                                alt='No content'>
                            </img>
                        </div>
                    </div>
                </>
            ) : <MainLoader />)}
        </div>
    )
}

export default LekDetails