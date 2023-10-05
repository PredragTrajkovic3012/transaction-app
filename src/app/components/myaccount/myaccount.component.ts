import { Component, OnDestroy, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { AmountEditComponent } from '../amount-edit/amount-edit.component'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-myaccount',
    templateUrl: './myaccount.component.html',
    styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit, OnDestroy {
    userSub: Subscription
    user: User = null

    constructor(
        private messageService: MessageService,
        public dialog: DialogService,
        private auth: AuthService
    ) {}
    ngOnInit(): void {
        this.userSub = this.auth.user.subscribe(u => {
            this.user = u
            
        })
    }
    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe()
        }
    }

    openEditAmountDialog() {
        const dialogRef = this.dialog.open(AmountEditComponent, {
            header: 'Change your account amount',
           
        })
        dialogRef.onClose.subscribe(result => {
            if (result) {
                this.messageService.add({
                    severity: 'success',
                    closable: true,
                    summary: 'Successful change',
                    detail: 'New amount is ' + result,
                    life: 4000
                })
            } else {
                this.messageService.add({
                    severity: 'error',
                    closable: true,
                    summary: 'Something went wrong',
                    life: 4000
                })
            }
        })
    }
}

