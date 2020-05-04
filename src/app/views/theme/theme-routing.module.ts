import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';

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
        data:{title:'company'}
      },
      // {
      //   path:'dndrelease',
      //   component:DNDReleaseComponent,
      //   runGuardsAndResolvers:'always',
      //   data:{title:'DND Release'}
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
