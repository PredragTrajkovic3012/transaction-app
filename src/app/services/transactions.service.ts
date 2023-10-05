import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    private apiUrl = 'http://localhost:5000/users'
    constructor(private http: HttpClient) {}

    updateUserAmount(user: User): Observable<User> {
        const url = `${this.apiUrl}/${user.id}`
        return this.http.put<User>(url, user, httpOptions)
    }
}

