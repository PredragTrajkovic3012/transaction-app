import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SigninComponent } from './components/signin/signin.component'
import { SignupComponent } from './components/signup/signup.component'
import { MyaccountComponent } from './components/myaccount/myaccount.component'
import { TransactionsComponent } from './components/transactions/transactions.component'

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'homepage', component: MyaccountComponent },
    { path: 'transactions', component: TransactionsComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

