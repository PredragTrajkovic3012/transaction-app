import { Category } from './../../../models/category.model'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { Subscription } from 'rxjs'
import { Transaction } from 'src/app/models/transaction.model'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { TransactionsService } from 'src/app/services/transactions.service'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-add-edit-transaction',
    templateUrl: './add-edit-transaction.component.html',
    styleUrls: ['./add-edit-transaction.component.scss']
})
export class AddEditTransactionComponent implements OnInit, OnDestroy {
    userSub: Subscription
    user: User = null

    categories: any[] = [
        { name: 'Bills', key: 1 },
        { name: 'Food', key: 2 },
        { name: 'Debts', key: 3 },
        { name: 'Leisure', key: 4 },
        { name: 'Other', key: 5 }
    ]
    addOrEditTransactionFormGroup: FormGroup | any = null
    constructor(
        public dialogRef: DynamicDialogRef,
        public dialogConfig: DynamicDialogConfig,
        private auth: AuthService,
        private transactionService: TransactionsService,
        private http: HttpClient
    ) {}

    transactionAmountAsyncValidator(): AsyncValidatorFn {
        return (control: FormControl): Observable<{ [key: string]: any } | null> => {
            const transactionAmount = control.value
            const accamount = this.user.accamount
            if (transactionAmount && accamount && transactionAmount > accamount) {
                return of({ insufficientFunds: true })
            }

            return of(null)
        }
    }

    ngOnInit(): void {
        this.userSub = this.auth.user.subscribe(u => {
            this.user = { ...u, transactions: [...u.transactions] }

            if (this.dialogConfig.data.mode === 'add') {
                this.addOrEditTransactionFormGroup = new FormGroup({
                    purchedItem: new FormControl(null, [Validators.required]),
                    amountSpent: new FormControl(null, [Validators.required],[this.transactionAmountAsyncValidator()]),
                    dateTime: new FormControl(new Date(), [Validators.required]),
                    category: new FormControl(1, [Validators.required])
                })
            } else if (this.dialogConfig.data.mode === 'edit') {
                const dateTime = new Date(this.dialogConfig.data?.transaction?.dateTime)
                this.addOrEditTransactionFormGroup = new FormGroup({
                    purchedItem: new FormControl(this.dialogConfig.data?.transaction?.purchedItem, [Validators.required]),
                    amountSpent: new FormControl(this.dialogConfig.data?.transaction?.amountSpent, [Validators.required],[this.transactionAmountAsyncValidator()]),
                    dateTime: new FormControl(dateTime, [Validators.required]),
                    category: new FormControl(this.dialogConfig.data?.transaction?.category, [Validators.required])
                })
            }
        })
    }
    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe()
        }
    }

    submitForm() {
        if (!this.addOrEditTransactionFormGroup.valid) {
            return
        }
        this.dialogConfig.data.mode === 'add' ? this.addTransaction() : this.editTransaction()
    }
    addTransaction() {
        const newTransaction: Transaction = {
            purchedItem: this.addOrEditTransactionFormGroup.value.purchedItem,
            amountSpent: this.addOrEditTransactionFormGroup.value.amountSpent,
            category: this.addOrEditTransactionFormGroup.value.category,
            dateTime: this.addOrEditTransactionFormGroup.value.dateTime
        }
        this.transactionService.addTransaction(newTransaction).subscribe(u => {
            this.auth.updateUser({ ...u, transactions: [...u.transactions] })
            this.dialogRef.close()
        })
    }
    editTransaction() {
        const newTransaction: Transaction = {
            purchedItem: this.addOrEditTransactionFormGroup.value.purchedItem,
            amountSpent: this.addOrEditTransactionFormGroup.value.amountSpent,
            category: this.addOrEditTransactionFormGroup.value.category,
            dateTime: this.addOrEditTransactionFormGroup.value.dateTime
        }
        this.transactionService.updateUserTransaction(newTransaction)
        this.dialogRef.close()
    }
}

