import { Component, OnInit, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NewLoadFilters } from '../../../../model/newload';
import { CreateloadService } from '../../../../services/createload.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';
import { AuthenticationService } from '../../../../views/authentication.service';
import {Router} from '@angular/router';
import { LoginUser } from '../../../../model/loginuser';

@Component({
  selector: 'app-loadform',
  templateUrl: './loadform.component.html',
  styleUrls: ['./loadform.component.scss']
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
  user: any;
  currency
  loadForm: FormGroup;
  public loginUser: LoginUser
  constructor(
    private _loadservice: CreateloadService,
    private _companyservice: CompanyService,
    private authService: AuthenticationService,
    private router: Router,
    private _toaster: ToastrService,
  ) {

  }

  ngOnInit() {
    this.loginUser = this.authService.getloginUser();
    this.newloadfilters['dispatcher']= this.loginUser['username'];
    var date= new Date()
    this.newloadfilters['date']= date.toLocaleDateString()
    this.newloadfilters['currency']='Select currency'
    this.newloadfilters['crossborder']="Cross border"
    this.newloadfilters['Equiptype']="Select equipment type"
    this.newloadfilters['sealed']="Seal required"
    this.newloadfilters['hazmat']="Hazmat material"
    this.newloadfilters['customer']="Select customer"
    this.newloadfilters['drivertype']="Select Driver type"
    this.newloadfilters['loadstatus']="Select load status"
    this.getData();
    this.getCompanyData();
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
  submit(){
    console.log(this.newloadfilters)
    this._loadservice.addLoadData(this.newloadfilters).subscribe(data => {
          console.log(data)
        });
  }
  submitload(){
    this.showsubmit=true
    this._loadservice.addLoadData(this.newloadfilters).subscribe(data => {
          console.log(data)
          sessionStorage.setItem('submitID', data.data._id)
          this.getData();
          this.showsubmit=false
          this._toaster.success("Load successfully created", "Success");
    }, error => {
       this._toaster.error("error", "Try Again");
    });
  }
  getCompanyData() {
    this._companyservice.getCompanyData().subscribe(data => {
      this.companydata=data
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
Addcompany(){
  this.router.navigateByUrl('/theme/customers');
}
    

}

