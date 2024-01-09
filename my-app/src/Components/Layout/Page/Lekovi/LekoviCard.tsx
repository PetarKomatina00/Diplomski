import React, { useState } from 'react'
import LekModel from '../../../../interfaces/LekModel'
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../../../../API/shoppingCartApi';
import MiniLoader from './Common/MiniLoader';
import apiResponse from '../../../../interfaces/apiResponse';
import toastNotify from '../../../../Helper/toastNotify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Storage/Redux/store';
import userModel from '../../../../interfaces/userModel';

interface Props {
    lek: LekModel
}
function LekoviCard(props: Props) {
    const navigate = useNavigate();
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [updateShoppingCart] = useUpdateShoppingCartMutation();
    const userData : userModel = useSelector((state : RootState) => state.userAuthStore);
    const handleAddToCart = async (lekID: number) => {
        if(!userData.id){
            navigate("/login")
            return;
        }
        setIsAddingToCart(true);
        const response : apiResponse= await updateShoppingCart({
            lekID: lekID,
            quantity: 1,
            userID: userData.id
        })
        if(response.data && response.data.isSuccess){
            toastNotify("Item added to cart successfully.")
        }
        setIsAddingToCart(false);
    }
    return (
        <div className='col-md-4 col-12 p-4'>
            <div className='card'
                style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}>
                <div className='card-body pt-2'>
                    <div className='row col-10 offset-1 p-4'>
                        <Link to={`/LekDetails/${props.lek.lekID}`}>
                            <img
                                src={props.lek.image}
                                style={{ borderRadius: "50%" }}
                                className='w-100 mt-5 image box'
                            ></img>
                        </Link>
                    </div>
                    {/** Dodati specialtag za lek */}
                    <i className="bi bi-star btn btn-success"
                        style=
                        {{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            padding: "5px 10px",
                            borderRadius: "3px",
                            outline: "none !important",
                            cursor: "pointer"
                        }}
                    >
                        &nbsp; SPECIAL
                    </i>

                    {isAddingToCart ?
                        (<>
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px'
                            }}>
                                <MiniLoader/>
                            </div>
                        </>)
                        : (<i className='bi bi-cart-plus btn btn-outline-danger'
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                padding: "5px 10px",
                                borderRadius: "3px",
                                outline: "none !important",
                                cursor: "pointer"
                            }}
                            onClick={() => handleAddToCart(props.lek.lekID)}
                        ></i>)}

                    <div className='text-center'>
                        <p className='card-title m-0 text-success fs-3'>
                            <Link to={`/LekDetails/${props.lek.lekID}`}
                                style={{ textDecoration: "none", color: "green" }}>
                                {props.lek.nazivLeka}
                            </Link>
                        </p>
                        <p className='badge bg-secondary' style={{ fontSize: "12px" }}>
                            category
                        </p>
                    </div>
                    <p className='card-text' style={{ textAlign: "center" }}>{props.lek.description}</p>
                    <div className='row text-center'>
                        <h4>${props.lek.price}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LekoviCard