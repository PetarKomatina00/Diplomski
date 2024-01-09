import { cartItemModel } from "./cartItemModel";

export interface shoppingCartModel {
  shoppingCartID?: number;
  userID?: string;
  cartItems?: cartItemModel[];
  totalPrice?: number;
  stripePaymentID?: any;
  clientSecret?: any;
}