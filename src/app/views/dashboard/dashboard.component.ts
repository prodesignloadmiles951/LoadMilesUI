import { CompanyFilters } from './../../model/companydetails';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { CreateloadService } from '../../services/createload.service';


@Component({
  templateUrl: 'dashboard.component.html',
  providers: [ToastrService]
})
export class DashboardComponent implements OnInit {

	constructor( private router: Router) {
 }
  ngOnInit() {
  }

 createLoad() {
    this.router.navigateByUrl('/dashboard/createload');
  }

 //  public company: CompanyFilters;
 //  // public EditMode: boolean = false;
 //  data: any;
 //  pageFilters: CompanyFilters;
 //  selectedCompany: any;
 //  EditMode: boolean;
 //  loadDetails=[];
 //  companydata=[];
 //  dropoffdata=[];
 //  pickupdata=[];


 // constructor(
 //  private router: Router,
 //  private _companyservice: CompanyService,
 //  private _toaster: ToastrService,
 //  private _pickup: PickupserviceService,
 //  private _dropoff: DropoffserviceService,
 //  private _loadservice: CreateloadService,
 // ) {
 //  this.pageFilters = new CompanyFilters();
 //   //console.log(this.userData);
 // }
 //  ngOnInit(): void {
 //    this.getData();
 //  }
 //  viewData(cmp) {
 //    this.EditMode = false;
 //    this.company = new CompanyFilters();
 //    this.company = cmp;
 //    this.selectedCompany = cmp.companyname;

 //  }


 //  getData() {
 //    this._loadservice.getLoadData().subscribe(data => {
 //      var res=data
 //      this._companyservice.getCompanyData().subscribe(resp => {
 //        console.log(resp)
 //        for (var i = 0; i < res.length;i++) {
 //          res[i]['load_number']=1000+i
 //          res[i]['customer_name']=resp[JSON.parse(res[i]['customer'][0])].companyname
 //        }
 //          this._pickup.getpickupData().subscribe(data => {
 //            this.pickupdata = data
 //            for (var i = 0; i < this.loadDetails.length; i++) {
 //               var pickitem = this.pickupdata.map(item => {
 //                 if(item._id == this.loadDetails[i]._id){
 //                   this.loadDetails[i]['pickupinfo'] = item
 //                 }
 //               })
 //              }
 //          })
 //          this.loadDetails = res;
 //           this._dropoff.getdroppoffData().subscribe(data => {
 //            this.dropoffdata = data
 //            for (var i = 0; i < this.loadDetails.length; i++) {
 //               var dropitem = this.dropoffdata.map(item => {
 //                 if(item._id == this.loadDetails[i]._id){
 //                   this.loadDetails[i]['dropoffinfo'] = item
 //                 }
 //               })
 //              }
 //          })
 //        console.log(this.loadDetails)
 //      });
 //    });
 //  }

 //  // editCompany(cmp) {
 //  //   this._companyservice.EditCompany(cmp._id).subscribe(response => {
 //  //     this._toaster.success("company successfull updated", "Success");
 //  //   }, error => {
 //  //      this._toaster.error("error", "Try Again");
 //  //     });
 //  // }

 //  // deleteCompany(cmp) {
 //  //   this._companyservice.DeleteCompany(cmp._id).subscribe(data => {
 //  //   this._toaster.info("Company Data Delete", "Success");
 //  //   this.getData();
 //  //  });
 //  //  }

 
}
