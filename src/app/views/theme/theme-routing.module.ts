import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { TrucksComponent } from './trucks.component';
import { TrailersComponent } from './trailers.component';

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
      // {
      //   path: 'purchases',
      //   component: PurchasesComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'Purchases'
      //   }
      // },
      // {
      //   path: 'users',
      //   component: UsersComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'users'
      //   }
      // },
      // {
      //   path: 'users/:id',
      //   component: UsersComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'users'
      //   }
      // },
      // {
      //   path: 'reseller',
      //   component: ResellerComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'Reseller'
      //   }
      // },
      // {
      //   path: 'transsummary',
      //   component: TranssummaryComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'transsummary'
      //   }
      // },
      // {
      //   path: 'payments',
      //   component: PaymentsComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'Payments'
      //   }
      // },
      // {
      //   path: 'salespayments',
      //   component: SalesPaymentsComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'Payments'
      //   }
      // },
      // {
      //   path: 'salestransactions',
      //   component: SalesPurchasesComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'Purchases'
      //   }
      // },
      // {
      //   path: 'salesallusers',
      //   component: SalesAllUsersComponent,
      //   runGuardsAndResolvers: 'always',
      //   data: {
      //     title: 'AllUsers'
      //   }
      // },
      // {
      //   path:'smssummary',
      //   component:SMSSummaryComponent,
      //   runGuardsAndResolvers: 'always',
      //   data:{title:'SMSSummary'}
      // },
      // {
      //   path:'deliveryreports',
      //   component:DeliveryreportsComponent,
      //   runGuardsAndResolvers: 'always',
      //   data:{title:'Delivery Reports'}
      // },
      // {
      //   path:'smslogs',
      //   component:SMSLogsComponent,
      //   runGuardsAndResolvers: 'always',
      //   data:{title:'SMSLogs'}
      // },
      // {
      //   path:'numberwise',
      //   component:NumberWiseReportComponent,
      //   runGuardsAndResolvers :'always',
      //   data:{title:'RecepientWise'}
      // },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
