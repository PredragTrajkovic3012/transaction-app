import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private apiUrl = 'http://localhost:5000/users'
  constructor(private http: HttpClient) { }

  signUpUser(user:User):Observable<User>{
    return this.http.post<User>(this.apiUrl,user,httpOptions)

  }
}
