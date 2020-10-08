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
  selector: 'app-loadeditform',
  templateUrl: './loadeditform.component.html',
  styleUrls: ['./loadeditform.component.scss'],
  providers: [ToastrService, CustomersService, CompanyService, DispatcherService]
})
export class LoadeditformComponent implements OnInit {
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
  SelectedLoad=true
  user: any;
  currency
  loadForm: FormGroup;
  public loginUser: LoginUser
  constructor(
    public dialogRef: MatDialogRef < LoadeditformComponent > ,
        @Inject(MAT_DIALOG_DATA) public resdata: any,
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
    sessionStorage.removeItem('Pickup')
    sessionStorage.removeItem('dropOffdetails')
    sessionStorage.removeItem('pickupdetails')
    
    this.loginUser = this.authService.getloginUser();
    this.newloadfilters['dispatcher']= this.loginUser['username'];
    console.log(this.resdata)
    if(this.resdata['EditMode'] == true){
      this.newloadfilters=this.resdata
    }
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
        // data[i]['loadstatus']=JSON.parse(data[i]['loadstatus'])
      }
      this.dataSource=[]
      this.dataSource = data;
      console.log(data)
    });
  }
  updateload(){
  	    this._loadservice.editLoadData(this.resdata).subscribe(data => {
            console.log(data)
         this._toaster.success("Load successfully Updated", "Success");
         this.dialogRef.close(data)
	}, error => {
        this._toaster.error("error", "Try Again");
     });
  }
  getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      console.log(data)
      this.dispatcherdata = data;
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
      this.customerdata=data
        });
  }
  hidePopup(){
     this.dialogRef.close(null)
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
          }
        })
}

}
