import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { TransactionsService } from 'src/app/services/transactions.service'

@Component({
    selector: 'app-amount-edit',
    templateUrl: './amount-edit.component.html',
    styleUrls: ['./amount-edit.component.scss']
})
export class AmountEditComponent implements OnInit, OnDestroy {
    changeAmountFormGroup: FormGroup | any = null
    userSub: Subscription
    user: User = null

    constructor(
        private auth: AuthService,
        private transactionService: TransactionsService,
        public dialogRef: DynamicDialogRef
    ) {}

    ngOnInit(): void {
        this.userSub = this.auth.user.subscribe(u => {
            this.user = u
            this.changeAmountFormGroup = new FormGroup({
                accamount: new FormControl(u.accamount, [Validators.required])
            })
        })
    }
    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe()
        }
    }
    changeAccountAmount() {
        const newUserData: User = this.user
        newUserData.accamount = this.changeAmountFormGroup.value.accamount
        this.transactionService.updateUserAmount(newUserData).subscribe(updatedUser => {
            this.auth.updateUser(updatedUser)
            this.dialogRef.close()
        })
    }
}

