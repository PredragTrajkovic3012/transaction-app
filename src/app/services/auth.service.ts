import { Injectable, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { User } from '../models/user.model'
import { Router } from '@angular/router'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit 
{

    user = new BehaviorSubject<User>(null)

    private apiUrl = 'http://localhost:5000/users'

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}
    ngOnInit(): void {}

    signUpUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user, httpOptions)
    }
    getAllUsers() {
        return this.http.get<User[]>(this.apiUrl, httpOptions)
    }
    logout() {
        this.user.next(null)
        this.router.navigate(['/login'])
        localStorage.removeItem('userData')
    }

    handleAuthentication(tryToLoginUser: User) {
        this.user.next({ ...tryToLoginUser })
        localStorage.setItem('userData', JSON.stringify(tryToLoginUser))
        this.router.navigate(['homepage'])
    }

    updateUser(newUser:User)
    {
      this.user.next({...newUser})
      localStorage.setItem('userData', JSON.stringify(newUser))

      

    }

    // TODO:autologin, autologout, maybe add token and auth-guard
}

