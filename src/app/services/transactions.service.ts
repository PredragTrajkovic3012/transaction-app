import { User } from './../models/user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Transaction } from '../models/transaction.model'
import { AuthService } from './auth.service'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class TransactionsService implements OnInit, OnDestroy {
    userSub: Subscription
    user: User = null
    activeUser
    private apiUrl = 'http://localhost:5000/users'

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {
        this.userSub = this.auth.user.subscribe(u => {
            this.user = { ...u, transactions: [...u.transactions] }
        })
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe()
        }
    }
    updateUserAmount(user: User): Observable<User> {
        const url = `${this.apiUrl}/${user.id}`
        return this.http.put<User>(url, user, httpOptions)
    }
    updateUserTransaction(transaction: Transaction) {
        const url = `${this.apiUrl}/${this.user.id}`
        const newUserData: User = { ...this.user, transactions: [...this.user.transactions] }
        const target = newUserData.transactions.find(t => t.purchedItem === transaction.purchedItem)
        if (target) {
            target.amountSpent = transaction.amountSpent
            target.category = transaction.category
            target.dateTime = transaction.dateTime
            target.purchedItem = transaction.purchedItem
        }
        return this.http.put<User>(url, newUserData, httpOptions).subscribe(() => {
            this.auth.updateUser(newUserData)
        })
    }
    addTransaction(transaction: Transaction): Observable<User> {
        const url = `${this.apiUrl}/${this.user.id}`
        const newUserData: User = { ...this.user, transactions: [...this.user.transactions] }
        newUserData.transactions.push(transaction)
        return this.http.put<User>(url, newUserData, httpOptions)
    }
    deleteTransaction(transaction: Transaction): Observable<User> {
        const url = `${this.apiUrl}/${this.user.id}`
        const newUserData: User = { ...this.user, transactions: [...this.user.transactions] }
        newUserData.transactions.forEach((value, index) => {
            if (value.purchedItem === transaction.purchedItem) newUserData.transactions.splice(index, 1)
        })
        return this.http.put<User>(url, newUserData, httpOptions)
    }

    // removeElementFromArray(element: number) {
    //     this.arrayElements.forEach((value,index)=>{
    //         if(value==element) this.arrayElements.splice(index,1);
    //     });
    // }
}

