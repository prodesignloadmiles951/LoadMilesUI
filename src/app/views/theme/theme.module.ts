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
    CompanyComponent
    
  ]
})
export class ThemeModule { }
