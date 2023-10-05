import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-amount-edit',
    templateUrl: './amount-edit.component.html',
    styleUrls: ['./amount-edit.component.scss']
})
export class AmountEditComponent implements OnInit {
    changeAmountFormGroup: FormGroup | any = null

    constructor() {}

    ngOnInit(): void {
        this.changeAmountFormGroup = new FormGroup({
            accamount: new FormControl(null, [Validators.required])
        })
    }
    changeAccountAmount() {}
}

