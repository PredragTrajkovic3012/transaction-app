import { MessageService } from 'primeng/api'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'

import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    loginFormGroup: FormGroup | any
    constructor(
        private auth: AuthService,
        private messageService: MessageService
    ) {}
    passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-<>]).{8,}$/
    ngOnInit(): void {
        this.loginFormGroup = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required,Validators.pattern(this.passwordRegEx)])
        })
    }

    logInUser() {
        let user = null
        this.auth.getAllUsers().subscribe(users => {
            user = users.find((u: User) => {
                return u.email === this.loginFormGroup.value.email && u.password === this.loginFormGroup.value.password
            })
            if (user) {
                this.auth.handleAuthentication(user)
            } else {
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    summary: 'Something went wrong!',
                    detail: 'Check that you have entered the form correctly',
                    life: 5000
                })
            }
        })
    }
}

