import { NavbarComponent } from './components/navbar/navbar.component'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PrimengModule } from './primeng/primeng.module'
import { SigninComponent } from './components/signin/signin.component'
import { SignupComponent } from './components/signup/signup.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MyaccountComponent } from './components/myaccount/myaccount.component'
import { TransactionsComponent } from './components/transactions/transactions.component'
import { AmountEditComponent } from './components/amount-edit/amount-edit.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component'


@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        NavbarComponent,
        MyaccountComponent,
        TransactionsComponent,
        AmountEditComponent,
        AdminpanelComponent,
        
    ],
    imports: [BrowserModule, AppRoutingModule, PrimengModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

