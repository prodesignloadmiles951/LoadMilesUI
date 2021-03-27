import { FuelcardListComponent } from './fuelcard-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { TrucksComponent } from './trucks.component';
import { TrailersComponent } from './trailers.component';
import { DriverComponent } from './driver.component';
import { CarrierComponent } from './carrier.component';
import { CustomersComponent } from './customers.component';
import { DispatcherComponent } from './dispatcher.component';
import { VendorComponent } from './vendor.component';
import { FactorComponent } from './factor.component';
import { FuelcardComponent } from './fuelcard.component';
import { AccidentComponent } from './accident.component';
import { MapComponent } from './map.component';
import { TruckslistComponent } from './trucks-list.component';
import { TrailerslistComponent } from './trailers-list.component';
import { DriverlistComponent } from './driver-list.component';
import { CarrierlistComponent } from './carrier-list.component';
import { CustomerslistComponent } from './customers-list.component';
import { DispatcherlistComponent } from './dispatcher-list.component';
import { CompanylistComponent } from './company-list.component';
import { VendorlistComponent } from './vendor-list.component';
import { FactorlistComponent } from './factor-list.component';

import { VendorBillListComponent } from './vendor-bill-list.component';
import { ExpenseListComponent } from './expense-list.component';
import { VendorPaymentComponent } from './vendorpaymentform/vendor-payment.component';
import { PaymentListComponent } from './payment-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: 'company',
        component: CompanyComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Company' }
      },
      {
        path: 'company-list',
        component: CompanylistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Company-List' }
      },
      {
        path: 'trucks',
        component: TrucksComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Trucks' }
      },
      {
        path: 'trucks-list',
        component: TruckslistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Trucks-List' }
      },
      {
        path: 'trailers',
        component: TrailersComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Trailres' }
      },
      {
        path: 'trailers-list',
        component: TrailerslistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Trailres-List' }
      },
      {
        path: 'driver',
        component: DriverComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Driver' }
      },
      {
        path: 'driver-list',
        component: DriverlistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Driver-List' }
      },
      {
        path: 'carrier',
        component: CarrierComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Carrier' }
      },
      {
        path: 'carrier-list',
        component: CarrierlistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Carrier-List' }
      },
      {
        path: 'customers',
        component: CustomersComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Customers' }
      },
      {
        path: 'customers-list',
        component: CustomerslistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Customers-List' }
      },
      {
        path: 'dispatcher',
        component: DispatcherComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Dispatcher' }
      },
      {
        path: 'dispatcher-list',
        component: DispatcherlistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Dispatcher-List' }
      },
      {
        path: 'expense-list',
        component: ExpenseListComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Expense Types' }
      },
      {
        path: 'vendor',
        component: VendorComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Vendor' }
      },
      {
        path: 'vendor-list',
        component: VendorlistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Vendor List' }
      },
      {
        path: 'vendor-bill-list',
        component: VendorBillListComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Vendor Bills' }
      },
      {
        path: 'vendorpaymentform/vendor-payment',
        component: VendorPaymentComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Pay Vendor' }
      },
      {
        path: 'payment-list',
        component: PaymentListComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Payment History' }
      },
      {
        path: 'factor',
        component: FactorComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Factor' }
      },
      {
        path: 'factor-list',
        component: FactorlistComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Factor List' }
      },
      {
        path: 'fuelcard',
        component: FuelcardComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Fuelcard' }
      },
      {
        path: 'fuelcard-list',
        component: FuelcardListComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Fuelcard List' }
      },
      {
        path: 'accident',
        component: AccidentComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Accident' }
      },
      {
        path: 'map',
        component: MapComponent,
        runGuardsAndResolvers: 'always',
        data: { title: 'Map' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
