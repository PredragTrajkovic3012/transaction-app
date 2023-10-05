import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
    timeout: any = null
    signUpFormGroup: FormGroup | any
    constructor(
        private auth: AuthService,
        private messageService: MessageService,
        private dialog: DialogService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.signUpFormGroup = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
            accamount: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        })
    }

    signUpUser() {
        const newUser: User = {
            name: this.signUpFormGroup.value.name,
            surname: this.signUpFormGroup.value.surname,
            accamount: this.signUpFormGroup.value.accamount,
            email: this.signUpFormGroup.value.email,
            password: this.signUpFormGroup.value.password
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
                    }, 5000)
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
}

