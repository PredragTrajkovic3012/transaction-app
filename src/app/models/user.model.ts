import { Transaction } from './transaction.model'
export interface User {
    id?: number
    name: string
    surname: string
    accamount: number
    email: string
    password: string
    transactions: Transaction[]
}
