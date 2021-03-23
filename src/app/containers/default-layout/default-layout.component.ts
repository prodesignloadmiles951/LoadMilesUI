import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { LoginUser } from '../../model/loginuser';
import { AuthenticationService } from '../../views/authentication.service';
import { salesNavItems } from '../../_nav';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [ToastrService]
})
export class DefaultLayoutComponent implements OnDestroy {
  // public navItems = navItems;
  navItems = []
  sideMenuList = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: ''
      }
    },
    {
      name: 'Company',
      url: '/theme/company-list',
      icon: 'icon-info'
    },
    {
      name: 'Trucks',
      url: '/theme/trucks-list',
      icon: 'icon-info'
    },
    {
      name: 'Trailers',
      url: '/theme/trailers-list',
      icon: 'icon-info'
    },
    {
      name: 'Driver',
      url: '/theme/driver-list',
      icon: 'icon-info'
    },
    {
      name: 'Carrier',
      url: '/theme/carrier-list',
      icon: 'icon-info'
    },
    {
      name: 'Customers',
      url: '/theme/customers-list',
      icon: 'icon-info'
    },
    {
      name: 'Dispatcher',
      url: '/theme/dispatcher-list',
      icon: 'icon-info'
    },
    {
      name: 'Expense Types',
      url: '/theme/expense-list',
      icon: 'icon-info'
    },
    {
      name: 'Vendor Management',
      url: '/theme',
      icon: 'icon-info',
      children: [
        {
          name: 'Vendor',
          url: '/theme/vendor-list',
          icon: 'icon-info'
        },
        {
          name: 'Vendor Bill',
          url: '/theme/vendor-bill-list',
          icon: 'icon-info'
        },
        {
          name: 'Pay Vendor',
          url: '/theme/vendorpaymentform/vendor-payment',
          icon: 'icon-info'
        },
        {
          name: 'Payment History',
          url: '/theme/payment-list',
          icon: 'icon-info'
        }
      ]
    },
    {
      name: 'Factor',
      url: '/theme/factor-list',
      icon: 'icon-info'
    },
    {
      name: 'Fuel Card',
      url: '/theme/fuelcard-list',
      icon: 'icon-info'
    },
    {
      name: 'Accident',
      url: '/theme/accident',
      icon: 'icon-info'
    },
    {
      name: 'Map (Trucks/Drivers)',
      url: '/theme/map',
      icon: 'icon-info'
    }
  ]
  driverMenuList = [
    {
      name: 'Driver',
      url: '/theme/driver-list',
      icon: 'icon-info'
    }
  ]
  public salesNavItems = salesNavItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public loginUser: LoginUser;
  public usertype: string;
  private value: any = {};
  data: any;
  userid = {}
  companylinkeddata = []
  selectedCompany = undefined
  constructor(
    private authService: AuthenticationService,
    private _companyservice: CompanyService,
    private router: Router,
    private _toaster: ToastrService,
    @Inject(DOCUMENT) _document?: any

  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(): void {
    // if (localStorage.selectedCompanyName != undefined) {
    //   this.selectedCompany = localStorage.selectedCompanyName      
    // }
    if (this.authService.getloginUser()) {
      this.loginUser = this.authService.getloginUser();
      console.log(this.loginUser)
      if (this.loginUser['roleId'] == 5) {
        this.navItems = this.driverMenuList
        this.router.navigateByUrl('theme/driver-list');
      } else {
        this.navItems = this.sideMenuList
        this.router.navigateByUrl('/dashboard');
      }
      var usercmpdetails = this.loginUser['result']['company']
      this.companylinkeddata = usercmpdetails
      console.log(usercmpdetails)
      for (var i = 0; i < usercmpdetails.length; i++) {
        if (usercmpdetails[i]['default']) {
          localStorage.setItem('selectedCompany', usercmpdetails[i]['_id']);
          localStorage.setItem('role', JSON.stringify(usercmpdetails[i]['role']));
          localStorage.setItem('selectedCompanyName', usercmpdetails[i]['name']);
          console.log(localStorage.selectedCompany)
          console.log(localStorage.role)
          console.log(localStorage.selectedCompanyName)
          this.selectedCompany = localStorage.selectedCompanyName
          if (usercmpdetails['role'] == 5) {
            this.router.navigateByUrl('theme/driver-list');
          }
        }
      }
    }
    this.authService.loginEvent.asObservable().subscribe(
      (data) => {
        console.log(data)
        this.loginUser = this.authService.getloginUser();
        if (this.loginUser['roleId'] == null) {
          this.navItems = this.sideMenuList
        } else {
          if (this.loginUser['roleId'] == 5) {
            this.navItems = this.driverMenuList
            this.router.navigateByUrl('theme/driver-list');
          } else {
            this.navItems = this.sideMenuList
          }
        }
      })
  }

  getData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  showLoadstatus() {
    this.router.navigateByUrl('loadstatus');
  }

  companyselected(cmp) {
    localStorage.setItem('selectedCompany', cmp._id)
    localStorage.setItem('selectedCompanyName', cmp.name)
    var cmpid = localStorage.getItem("selectedCompany")
    var selectedCompanyName = localStorage.getItem("selectedCompanyName")
    this.userid = this.loginUser['_id']
    if (cmp['role'] == 5) {
      this.navItems = this.driverMenuList
      this.router.navigateByUrl('theme/driver-list');
    } else {
      this.navItems = this.sideMenuList
      this.router.navigateByUrl('dashboard')
    }
    this._toaster.success(cmp.name + " selected successfully", "Success", { timeOut: 2000, });


    // this._companyservice.getcompanyroleinfo(cmpid,this.userid).subscribe(data => {
    //   this._toaster.success(cmp.name+" selected successfully", "Success", {timeOut: 2000,});
    //   this.authService.setLogin(data);
    //   this.authService.setRole(data);
    // })
  }


  Logout() {
    this.authService.clearAuthentication()
  }
}
