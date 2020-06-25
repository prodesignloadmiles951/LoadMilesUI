import { Component, OnDestroy, Inject,OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { LoginUser } from '../../model/loginuser';
import { AuthenticationService } from '../../views/authentication.service';
import {salesNavItems} from '../../_nav';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: []
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public salesNavItems = salesNavItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  private router:Router;
  public loginUser: LoginUser;
  public usertype :string;
  data: any;
  constructor(
    private authService: AuthenticationService,
    private _companyservice: CompanyService,
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
    if (this.authService.getloginUser()) {
      this.loginUser = this.authService.getloginUser();
      if (this.loginUser) {

         if(this.loginUser.usertype=="sales"){
           this.navItems = salesNavItems;
         }
      }
    }
    this.getData();
  }
  
  getData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  Logout(){
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }
}
