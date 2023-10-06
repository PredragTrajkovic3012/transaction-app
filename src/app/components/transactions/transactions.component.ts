import { TransactionsService } from 'src/app/services/transactions.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { Subscription } from 'rxjs'
import { Transaction } from 'src/app/models/transaction.model'
import { AuthService } from 'src/app/services/auth.service'
import { AddEditTransactionComponent } from './add-edit-transaction/add-edit-transaction.component'
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api'

interface Column {
    field: string
    header: string
}

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
    userSub: Subscription
    mode = 'add'
    transactions!: Transaction[]

    cols!: Column[]
    constructor(
        private auth: AuthService,
        public dialog: DialogService,
        private transactionsService: TransactionsService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.auth.user.subscribe(u => {
            this.transactions = u?.transactions.slice()
        })
        this.cols = [
            { field: 'purchedItem', header: 'Item purchased' },
            { field: 'dateTime', header: 'Date & Time' },
            { field: 'category', header: 'Category' },
            { field: 'amountSpent', header: 'Amount Spent' },
            { field: 'edit', header: 'Edit' },
            { field: 'delete', header: 'Delete' }
        ]
    }

    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe()
        }
    }

    openAddorEditDialog(mode: string, transaction?: Transaction) {
        this.mode = mode
        if (this.mode === 'add') {
            const dialogRef = this.dialog.open(AddEditTransactionComponent, {
                width: '90%',
                header: 'Add new transaction',
                data: { mode: this.mode }
            })
        }
        if (this.mode === 'edit' && transaction) {
            const dialogRef = this.dialog.open(AddEditTransactionComponent, {
                width: '90%',
                header: 'Edit transaction',
                data: {
                    mode: this.mode,
                    transaction: transaction
                }
            })
        }
    }

    deleteTransaction(transaction: Transaction) {
        this.confirmationService.confirm({
            accept: () => {
                this.transactionsService.deleteTransaction(transaction).subscribe(u => {
                    this.auth.updateUser({ ...u, transactions: [...u.transactions] })
                })
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Transaction delted' })
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected!' })
                        break
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'You have cancelled' })
                        break
                }
            }
        })
    }
}

