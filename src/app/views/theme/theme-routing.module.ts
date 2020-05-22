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

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path:'company',
        component:CompanyComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Company'}
      },
      {
        path:'trucks',
        component:TrucksComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Trucks'}
      },
      {
        path:'trailers',
        component:TrailersComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Trailres'}
      },
      {
        path:'driver',
        component:DriverComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Driver'}
      },
      {
        path:'carrier',
        component:CarrierComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Carrier'}
      },
      {
        path:'customers',
        component:CustomersComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Customers'}
      },
      {
        path:'dispatcher',
        component:DispatcherComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Dispatcher'}
      },
      {
        path:'vendor',
        component:VendorComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Vendor'}
      },
      {
        path:'factor',
        component:FactorComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Factor'}
      },
      {
        path:'fuelcard',
        component:FuelcardComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Fuelcard'}
      },
      {
        path:'accident',
        component:AccidentComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Accident'}
      },
      {
        path:'map',
        component:MapComponent,
        runGuardsAndResolvers:'always',
        data:{title:'Map'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
