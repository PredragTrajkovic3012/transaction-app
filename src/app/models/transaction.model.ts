import { Category } from "./category.model"

export interface Transaction {
    id?:number
    purchedItem:string
    category:Category,
    dateTime:string,
    amountSpent:number

}