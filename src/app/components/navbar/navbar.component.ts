import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    loggedUserAuthSubs$: Subscription
    loggedUser: User
    items: MenuItem[] | undefined
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loggedUserAuthSubs$ = this.auth.user.subscribe(user => {
            this.loggedUser = user ? user : null
            if (!this.loggedUser) {
                this.router.navigate(['login'])
            }
        })
        this.items = [
            {
                label: 'MyAccount',
                icon: 'pi pi-fw pi-user',
                styleClass: '',
                routerLink: '/homepage'
            },
            {
                label: 'Transactions',
                icon: 'pi pi-fw pi-wallet',
                routerLink: '/transactions'
            },
            {
                label: 'Admin Panel',
                icon: 'pi pi-fw pi-star-fill',
                routerLink: '/adminpanel',
                visible: this.loggedUser?.email === 'admin@kireygroup.com' ? true : false
            },
            {
                label: 'Sign out',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.logout()
            }
        ]
    }
    ngOnDestroy(): void {
        if (this.loggedUserAuthSubs$) {
            this.loggedUserAuthSubs$.unsubscribe()
        }
    }

    logout() {
        this.auth.logout()
    }
    // isAdmin(): boolean {
    //     let isA = false
    //     this.auth.user.subscribe(u => {
    //         console.log(u)
    //         if (u.email === 'admin@kireygroup.com' && u.password === 'Admin@kireygroup2023') {
    //             isA = true
    //         } else isA = false
    //     })

    //     return isA
    // }
}

