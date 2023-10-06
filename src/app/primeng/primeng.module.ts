import { PasswordModule } from 'primeng/password'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { ConfirmationService, MessageService } from 'primeng/api'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'
import { MenubarModule } from 'primeng/menubar'
import { MessagesModule } from 'primeng/messages'
import { TableModule } from 'primeng/table'
import { CalendarModule } from 'primeng/calendar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ToastModule } from 'primeng/toast'
@NgModule({
    exports: [
        ButtonModule,
        PasswordModule,
        InputTextModule,
        InputNumberModule,
        MenubarModule,
        MessagesModule,
        TableModule,
        CalendarModule,
        RadioButtonModule,
        ConfirmDialogModule,
        ToastModule
    ],
    declarations: [],
    imports: [CommonModule],
    providers: [MessageService, DialogService, ConfirmationService, ConfirmDialogModule]
})
export class PrimengModule {}

