import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LoadstatusComponent } from './views/loadstatus/loadstatus.component';
import { CompanyregisterComponent } from './views/companyregister/companyregister.component'
import { EmailValidateComponent } from './views/email-validate/email-validate.component';
import { ForgotpasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { ValidateupdatepasswordComponent } from './views/validateupdatepassword/validateupdatepassword.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // {
  //   path: 'dashboard',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: 'loadstatus',
    component: LoadstatusComponent,
    data: {
      title: 'Loadstatus'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'login/:token',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgotPassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'Forgotpassword Page'
    }
  },
  {
    path: 'forgotpassword/:token',
    component: ValidateupdatepasswordComponent,
    data: {
      title: 'Validatepassword Page'
    }
  },
  {
    path: 'companyregister',
    component: CompanyregisterComponent,
    data: {
      title: 'Company Register Page'
    }
  },
  {
    path: 'validate/:token',
    component: EmailValidateComponent,
    data: {
      title: 'Email Validate'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      
      
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
      
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      }
      
    ],
    
    runGuardsAndResolvers: 'always',
  },
  { path: '**', component: P404Component }
];

// @NgModule({
//   imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'}) ],
//   exports: [ RouterModule ]
// })
// export class AppRoutingModule {}
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
