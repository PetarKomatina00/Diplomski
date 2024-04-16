import LekModel from "./LekModel";

export interface cartItemModel {
    cartItemID?: number;
    lekID?: number;
    lek?: LekModel;
    kolicina?: number;
    shoppingCartID : number
}
