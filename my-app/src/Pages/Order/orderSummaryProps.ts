import { shoppingCartModel } from "../../interfaces/shoppingCartModel"

export interface orderSummaryProps{
    data : {
        id : number,
        cartItems : shoppingCartModel[],
        totalPrice : number,
        userID : string, 
        stripePaymentID : string,
    },
    userInput : {
        name : string, 
        email : string,
        phoneNumber : string
    }
}