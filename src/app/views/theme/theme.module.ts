// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule } from 'ngx-toastr';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import {CompanyComponent} from './company.component';
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
import { MapComponent } from './map.component'

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    NgSelectModule,
    ModalModule.forRoot()
  ],
  declarations: [
    CompanyComponent,
    TrucksComponent,
    TrailersComponent,
    DriverComponent,
    CarrierComponent,
    CustomersComponent,
    DispatcherComponent,
    VendorComponent,
    FactorComponent,
    FuelcardComponent,
    AccidentComponent,
    MapComponent
  ]
})
export class ThemeModule { }
