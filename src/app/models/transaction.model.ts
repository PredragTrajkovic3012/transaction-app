import { Category } from "./category.model"

export interface Transaction {
    purchedItem:string
    category:Category,
    dateTime:string,
    amountspent:number

}