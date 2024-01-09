import { useSelector } from "react-redux"
import { cartItemModel } from "../../interfaces/cartItemModel"
import { RootState } from "../../Storage/Redux/store"
import InputHelper from "../../Helper/InputHelper";
import { useEffect, useState } from "react";
import MiniLoader from "../../Components/Layout/Page/Lekovi/Common/MiniLoader";
import userModel from "../../interfaces/userModel";
import { useInitialPaymentMutation } from "../../API/paymentApi";
import { useNavigate } from "react-router-dom";
import apiResponse from "../../interfaces/apiResponse";

export default function UserDetails() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const userData : userModel = useSelector((state : RootState) => state.userAuthStore);
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    )
    let grandTotal = 0;
    let totalItems = 0;

    shoppingCartFromStore?.map((cartItem: cartItemModel) => {
        totalItems += cartItem.kolicina ?? 0;
        grandTotal += (cartItem.lek?.price ?? 0) * (cartItem.kolicina ?? 0)
        return null;
    })
    const initalUserData = {
        name: userData.fullName,
        email: userData.email,
        phoneNumber: "",
    }
    const [userInput, setUserInput] = useState(initalUserData)
    const [initiatePayment] = useInitialPaymentMutation();
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = InputHelper(e, userInput)
        setUserInput(tempData);
    }

    useEffect(() => {
        setUserInput({
            name : userData.fullName,
            email : userData.email,
            phoneNumber : ""
        })
    }, [userData])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const {data} : apiResponse = await initiatePayment(userData.id);
        console.log("This is the data from UserDetails");
        console.log(data);
        navigate("/payment", {
            state : {apiResult : data?.result, userInput}
        })
    }
    return (
        <div className="border pb-5 pt-3">
            <h1>Pickup Details</h1>
            <form className="col-10 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    Pickup Name
                    <input
                        type="text"
                        value={userInput.name}
                        className="form-control"
                        name="name"
                        onChange={handleUserInput}
                        required />
                </div>
                <div className="form-group mt-3">
                    PickUp Email
                    <input
                        type="text"
                        value={userInput.email}
                        className="form-control"
                        name="email"
                        onChange={handleUserInput}
                        required />
                </div>
                <div className="form-group mt-3">
                    PickUp Phone Number
                    <input
                        type="number"
                        value={userInput.phoneNumber}
                        className="form-control"
                        name="phoneNumber"
                        onChange={handleUserInput}
                        required />
                </div>
                <div className="form-group mt-3">
                    <div className="card p-3" style={{ background: "ghostwhite" }}>
                        <h5>Grand Total : ${grandTotal}</h5>
                        <h5>No of items: ${totalItems}</h5>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-success form-control mt-3"
                    disabled = {isLoading}>
                        {isLoading ? <MiniLoader/> : "Looks Good? Place Order!"}              
                </button>
            </form>
        </div>
    )
}