import { NavbarComponent } from './components/navbar/navbar.component'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PrimengModule } from './primeng/primeng.module'
import { SigninComponent } from './components/signin/signin.component'
import { SignupComponent } from './components/signup/signup.component'

@NgModule({
    declarations: [AppComponent, SigninComponent, SignupComponent, NavbarComponent],
    imports: [BrowserModule, AppRoutingModule, PrimengModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

