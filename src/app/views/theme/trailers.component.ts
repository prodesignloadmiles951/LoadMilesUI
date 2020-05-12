import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    providers: []
})
export class TrailersComponent implements OnInit {
    trailersForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.trailersForm = this.formBuilder.group({
            unitNumber: ['', Validators.required],
            trailerType: ['', Validators.required],
            make: ['', Validators.required],
            color: ['', Validators.required, Validators.pattern],
            year: ['', Validators.required, Validators.pattern],
            reeferMake: [''],
            reeferModal: [''],
            reeferVin: ['', Validators.pattern],
            deductTools: [''],
            deductFuel: [''],
            inspectionExpirydate: [''],
            registerdState: [''],
            platesExpirationdate: [''],
            insuranceExpirationdate: [''],
            insuranceValue: [''],
            companyOwned: [''],
            price: [''],
            purchaseDate: [''],
            operationDate: [''],
            financer: [''],
            dealer: [''],
            leased: [''],
            leasedfrom: [''],
            leaseStart: [''],
            leaseExpirydate: [''],
            leaseInstallment: [''],
            reeferPurchasedate: [''],
            reeferPrice: [''],
            installment: [''],
            trailerSize: [''],
            operatingStatus: [''],
            reeferMiles: [''],
            reeferHours: [''],
            vin: [''],
            registerState: [''],
            plateNumber: [''],
            fuelCard: [''],
            fuelType: [''],
            ezPass: [''],
            category: [''],
            description: [''],
            startDate: [''],
            startingMileage: [''],
            noofMiles: [''],
            nextServicemiles: [''],
            lastServicedate: [''],
            nextServicedate: [''],
            comments: [''],
        });
    }
    get f() { return this.trailersForm.controls; }

    submit() {
        this.submitted = true;
        if (this.trailersForm.invalid) {
            return;
        }
        //alert('success');
        console.log(this.trailersForm.value);
       }
}
