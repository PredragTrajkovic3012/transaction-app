import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { AmountEditComponent } from '../amount-edit/amount-edit.component'

@Component({
    selector: 'app-myaccount',
    templateUrl: './myaccount.component.html',
    styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
    accountAmount: number = 10000

    constructor(
        private messageService: MessageService,
        public dialog: DialogService
    ) {}
    ngOnInit(): void {}

    openEditAmountDialog() {
        const dialogRef = this.dialog.open(AmountEditComponent, {
            header: 'Change your account amount',
            data: {
                currentAmount: this.accountAmount
            }
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

