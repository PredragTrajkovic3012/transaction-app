import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined

    ngOnInit(): void {
        this.items = [
            {
                label: 'MyAccount',
                icon: 'pi pi-fw pi-user',
                styleClass: ''
            },
            {
                label: 'Transactions',
                icon: 'pi pi-fw pi-wallet'
            },
            {
                label: 'Sign out',
                icon: 'pi pi-fw pi-sign-out'
            }
        ]
    }
}

