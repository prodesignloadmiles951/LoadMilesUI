import { Component, OnInit, ElementRef, TemplateRef, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { NewLoadFilters } from '../../../../model/newload';
import { CreateloadService } from '../../../../services/createload.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';
import { AuthenticationService } from '../../../../views/authentication.service';
import {Router} from '@angular/router';
import { LoginUser } from '../../../../model/loginuser';
import { CustomersService } from '../../../../services/customers.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DispatcherService } from '../../../../services/dispatcher.service';
import { LoadcustomerformComponent } from '../../loadcustomerform/loadcustomerform.component'
@Component({
  selector: 'app-loadform',
  templateUrl: './loadform.component.html',
  styleUrls: ['./loadform.component.scss'],
  providers: [ToastrService, CustomersService, CompanyService, DispatcherService]
})
export class LoadformComponent implements OnInit {
  public load: NewLoadFilters
  newloadfilters= {};
  panelOpenState = false;
  pickupchild = false;
  dataSource=[];
  states=[]
  data: any;
  drivertypeDetails: any = [];
  loadstatusDetails: any = [];
  showsubmit=false;
  companydata=[];
  customerdata=[];
  dispatcherdata=[];
  selectedCompanyName=undefined
  user: any;
  currency
  loadForm: FormGroup;
  showloadnumber=false;
  loadNumber={}
  public loginUser: LoginUser
  constructor(
    // public dialogRef: MatDialogRef < LoadformComponent > ,
    //     @Inject(MAT_DIALOG_DATA) public resdata: any,
    private _loadservice: CreateloadService,
    private _companyservice: CompanyService,
    private _customersservice: CustomersService,
    private _dispatcherService: DispatcherService,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private _toaster: ToastrService,
  ) {

  }

  ngOnInit() {
    // this.loadForm.reset()
    sessionStorage.removeItem("submitID")
    sessionStorage.removeItem("Pickup")
    sessionStorage.removeItem("dropOffdetails")
    sessionStorage.removeItem("pickupdetails")
    
    this.loginUser = this.authService.getloginUser();
    this.newloadfilters['dispatcher']= this.loginUser['username'];
    this.selectedCompanyName = localStorage.getItem("selectedCompanyName")
    var date= new Date()
    this.newloadfilters['date']= date.toLocaleDateString()
    this.newloadfilters['currency']='Select currency'
    this.newloadfilters['crossborder']="Cross border"
    this.newloadfilters['Equiptype']="Select equipment type"
    this.newloadfilters['sealed']="Seal required"
    this.newloadfilters['hazmat']="Hazmat material"
    // this.newloadfilters['customer']="Select customer"
    this.newloadfilters['drivertype']="Select Driver type"
    this.newloadfilters['LoadStatus']="Select load status"
    this.getData();
    this.getCompanyData();
    this.getCustomerdata()
    this.getDispatcherData()
  }


 getData() {
    this._loadservice.getLoadData().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        if(data[i].drivertype){
          data[i]['drivType']=1
        }else{
          data[i]['drivType']=0
        }
      }
      this.dataSource=[]
      this.dataSource = data;
      console.log(data)
    });
  }
  submitload(){
    this.showsubmit=true
      this.newloadfilters['company'] = this.selectedCompanyName
    this.newloadfilters['companyId'] =  localStorage.selectedCompany;
      if(this.newloadfilters['customer'] != undefined){
        this._loadservice.addLoadData(this.newloadfilters).subscribe(data => {
            if(data.Status == "error"){
            this._toaster.error(data.error,"Failed", {timeOut: 2000,});
          }else{
              sessionStorage.setItem('submitID', data.data._id)
              this.getData();
              this.showsubmit=false
              this._toaster.success("Load successfully created", "Success");
              if(data.data.loadNumber != undefined){
              this.showloadnumber=true
              this.loadNumber = data.data.loadNumber
              }
            }
        }, error => {
           this._toaster.error("error", "Try Again");
        });
      }else{
        this.showsubmit=false
        this._toaster.error("error", "Please select customer name");
      }
  }
  getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.dispatcherdata = data.result;
      this.dispatcherdata.push({firstname:this.newloadfilters['dispatcher']})
    });
  }
  getCompanyData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.companydata=data
    });
  }
  getCustomerdata(){
    this._customersservice.getCustomersData().subscribe(data => {
      data = data.result;

      for (var i = 0; i < data.length; i++) {
        if (data[i].displayName != undefined){
          this.customerdata.push(data[i])
        }
      }
        });
  }
 
  resetload(){}
  addpickup(){
    this.pickupchild= true
    var element = document.getElementById("pickupform")
    element.classList.remove('scroll')
    var itm = document.getElementById("template");
    var cln = itm.cloneNode(true);
    document.getElementById("viewContainer").appendChild(cln);
  }
  deletepickup(){}
  adddropoff(){
    var element = document.getElementById("dropoffform")
    element.classList.remove('scroll')
    var itm = document.getElementById("droptemplate");
    var cln = itm.cloneNode(true);
    document.getElementById("dropoffContainer").appendChild(cln);
  }
  deletedropoff(){}
   logEvent(eventName) {
        // this.events.unshift(eventName);
    }
Addcustomer(){
  let dialogConfig = Object.assign({ width: "1100px" },{ data: {} })
        let editDialogRef = this.dialog.open(LoadcustomerformComponent, dialogConfig);
        editDialogRef.afterClosed().subscribe((data) => {
          console.log(data)
          if(data == null){}else{
            this.getData() 
            this.getCustomerdata()       
          }
        })
}
    

}

