import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-trucks',
    templateUrl: './trucks.component.html',
    providers: []
})
export class TrucksComponent implements OnInit {
    trucksForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.trucksForm = this.formBuilder.group({
            plate: ['', Validators.required],
            operationStatus: [''],
            startingMileage: [''],
            currentMiles: [''],
            make: ['', Validators.required],
            modal: ['', Validators.required],
            color: [''],
            yom: ['', Validators.required, Validators.pattern],
            vin: [''],
            gearType: [''],
            eld: [''],
            gps: [''],
            fuelCard: [''],
            ezPass: [''],
            expiryDate: [''],
            registerdState: [''],
            platesExpirationdate: [''],
            insuranceExpirationdate: [''],
            insuranceValue1: [''],
            driverName: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern]],
            insuranceExpirationdate2: [''],
            insuranceValue2: [''],
            comapnyOwned: [''],
            price: [''],
            purchaseDate: [''],
            operationDate: [''],
            financer: [''],
            installment1: [''],
            installmentDuedate1: [''],
            dealer: [''],
            leased: [''],
            leasedFrom: [''],
            leaaseStart: [''],
            leaseExpirydate: [''],
            installment2: [''],
            installmentDuedate2: [''],
            dispatcher: [''],
            dispatcherContact: [''],
            dispatcherEmail: [''],
            trailerType: [''],
            plateNumber: [''],
        });
    }
    get f() { return this.trucksForm.controls; }

    submit() {
        this.submitted = true;
        if (this.trucksForm.invalid) {
            return;
        }
        //alert('success');
        console.log(this.trucksForm.value);
       }
}
