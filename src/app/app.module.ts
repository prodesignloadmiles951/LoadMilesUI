import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthenticationService } from './views/authentication.service';
import { CompanyService } from './services/company.service';
import { AuthHeaderService } from './views/authheader.service';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatExpansionModule} from '@angular/material/expansion';
import {
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxDataGridComponent
} from 'devextreme-angular';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadstatusComponent } from './views/loadstatus/loadstatus.component';
import { CompanyregisterComponent } from './views/companyregister/companyregister.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule,
    MatExpansionModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    NgSelectModule,
    MatMenuModule,
    MatSelectModule,
    DxDataGridModule,
    ModalModule,
    ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			enableHtml:true,
			newestOnTop:true,
		}),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    LoadstatusComponent,
    CompanyregisterComponent
  ],
  providers: [
    {provide: LocationStrategy,useClass: HashLocationStrategy},
    AuthenticationService,
    AuthHeaderService,CompanyService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
