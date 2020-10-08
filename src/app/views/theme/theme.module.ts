// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule } from 'ngx-toastr';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialogModule} from '@angular/material/dialog';
import { FileUploadModule} from 'ng2-file-upload';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { CompanyComponent} from './company.component';
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
import { MatExpansionModule} from '@angular/material/expansion';
import {
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxDataGridComponent
} from 'devextreme-angular';
import { TruckformComponent } from './truckform/truckform.component';
import { TrailerformComponent } from './trailerform/trailerform.component';
import { DriverformComponent } from './driverform/driverform.component';
import { CarrierformComponent } from './carrierform/carrierform.component';
import { CustomerformComponent } from './customerform/customerform.component';
import { DispatcherformComponent } from './dispatcherform/dispatcherform.component';
import { CompanyformComponent } from './companyform/companyform.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    NgSelectModule,
    DxDataGridModule,
    ModalModule.forRoot(),
    MatExpansionModule,
    NgxDocViewerModule,
    PdfViewerModule,
    MatDialogModule,
    FileUploadModule
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
    MapComponent,
    TruckslistComponent,
    TrailerslistComponent,
    DriverlistComponent,
    CarrierlistComponent,
    CustomerslistComponent,
    DispatcherlistComponent,
    CompanylistComponent,
    VendorlistComponent,
    FactorlistComponent,
    TruckformComponent,
    TrailerformComponent,
    DriverformComponent,
    CarrierformComponent,
    CustomerformComponent,
    DispatcherformComponent,
    CompanyformComponent
  ],
  exports: [TruckformComponent, TrailerformComponent, DriverformComponent, CarrierformComponent, CustomerformComponent, DispatcherformComponent, CompanyformComponent],
  entryComponents: [TruckformComponent, TrailerformComponent, DriverformComponent, CarrierformComponent, CustomerformComponent, DispatcherformComponent, CompanyformComponent],
})
export class ThemeModule { }
