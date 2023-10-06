import { Component, OnDestroy, OnInit } from '@angular/core'
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
    timeout: any = null
    signUpFormGroup: FormGroup | any
    /* Password should be at least 8 characters long and should contain one number,one uppercase character and one special character.*/
    passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-<>]).{8,}$/

    constructor(
        private auth: AuthService,
        private messageService: MessageService,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.signUpFormGroup = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
            accamount: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email], [this.emailAsyncValidator()]),
            password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegEx)])
        })
    }

    signUpUser() {
        const newUser: User = {
            name: this.signUpFormGroup.value.name,
            surname: this.signUpFormGroup.value.surname,
            accamount: this.signUpFormGroup.value.accamount,
            email: this.signUpFormGroup.value.email,
            password: this.signUpFormGroup.value.password,
            transactions: []
        }
        this.auth.signUpUser(newUser).subscribe(
            newUser => {
                if (newUser) {
                    this.messageService.add({
                        severity: 'success',
                        closable: true,
                        summary: 'New User has been created',
                        detail: 'With an email:' + newUser.email,
                        life: 5000
                    })
                    this.signUpFormGroup.reset()
                    this.timeout = setTimeout(() => {
                        this.router.navigate(['login'])
                    }, 3000)
                }
            },
            err => {
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    summary: 'Something went wrong',
                    detail: '...',
                    life: 5000
                })
            }
        )
    }

    ngOnDestroy(): void {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }

    checkEmailExistence(email: string): Observable<boolean> {
        const apiUrl = `http://localhost:5000/users`
        return this.http.get<any[]>(apiUrl).pipe(
            map(users => {
                return users.some(user => user.email === email)
            })
        )
    }

    emailAsyncValidator(): AsyncValidatorFn {
        return (control: FormControl): Observable<{ [key: string]: any } | null> => {
            const email = control.value
            return this.checkEmailExistence(email).pipe(
                map(isTaken => (isTaken ? { emailTaken: true } : null)),
                catchError(() => of(null)) // do this later
            )
        }
    }
}

