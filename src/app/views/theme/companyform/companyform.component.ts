import { Component, OnInit, Input, Inject } from '@angular/core';
import { CompanyFilters } from '../../../model/companydetails';
import { CompanyService } from '../../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUser } from '../../../model/loginuser';
import { AuthenticationService } from '../../../views/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.scss'],
  providers: [CompanyService,ToastrService]
})
export class CompanyformComponent implements OnInit {
	  public pageFilters: CompanyFilters;
    public loginUser: LoginUser;
	  Companylistdata = new Array<CompanyFilters>();
	  submitted: boolean;
    @Input() datatype;
	  currency
    pageFiltersshow=false;
    mode=false
	  model: any = {};
	  usermanagementdata= [];
    showAddOption=false
    roleArray=[]
    username=[]
    showusertable=false
    btnHide=false 
    showupdate=false
    showsubmit=false
    changeUplaod=true
    editFileList=[]
    selectedCompany=true
    finalArry=[];
    cmpid=undefined
    companyForm: FormGroup;

  constructor(public dialogRef: MatDialogRef < CompanyformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,private _toaster: ToastrService,
     private _companyservice: CompanyService,
     private authService: AuthenticationService,
     private router: Router) {
      console.log(this.data)
      }

  ngOnInit() {
    this.getroles()
    this.getusers()
    if (this.authService.getloginUser()) {
      this.loginUser = this.authService.getloginUser();
      if (this.loginUser['role']['name'] == 'Admin' && this.data['companyname'] == localStorage.selectedCompanyName) {
         this.showusertable = true
          this.cmpid = this.data['_id']
          this._companyservice.getUserroledetails(this.cmpid).subscribe(response => {
            for (var i = 0; i < response.length; i++) {
              response[i]['isActive'] = response[i]['role']['isActive']

              for (var j = 0; j < this.roleArray.length; j++) {
                if(response[i]['role']['name'] == this.roleArray[j]['name']){
                  response[i]['name'] = this.roleArray[j]['ID']
                }
              }

              for (var k = 0; k < this.username.length; k++) {
                if(response[i]['email'] == this.username[k]['email']){
                  response[i]['email'] = this.username[k]['ID']
                }
              }
            }
            this.usermanagementdata = response
            console.log(this.usermanagementdata)
        }, error => {
           console.log(error)
          });

      }else{
        this.showusertable = false
      }
    }

  	this.pageFilters = new CompanyFilters();
    this.pageFilters.currency='Select currency'

   if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedCompany=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.changeUplaod=false
      if(this.data['EditMode']){
        this.showupdate=true
        this.editFileList=this.data['files']
      }
    }
    this.pageFiltersshow=true;
   
}

update() {
     console.log(this.data)
          this.btnHide=true
        this._companyservice.EditCompany(this.data).subscribe(response => {
          this._toaster.success("company successfully updated", "Success", {timeOut: 3000,});
          this.btnHide=false
         this.dialogRef.close(response)
        }, error => {
           this._toaster.error("Company not updated", "Try Again", {timeOut: 2000,});
          });
   }

   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
      this.submitted = true;
      if(this.pageFilters.companyname !== undefined){
          console.log(this.pageFilters)
          this.btnHide=true
        this._companyservice.SendForm(this.pageFilters).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Company Data Submitted","Success", {timeOut: 3000,});
          this.dialogRef.close(response)
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
      }else{
          this._toaster.error("Enter Company Name","Failed", {timeOut: 2000,});
      }
     }
   }

   getroles(){
      this._companyservice.getRoleData().subscribe(res => {
       for (var i = 0; i < res.length; i++) {
         res[i]['ID']=i
       }
       this.roleArray=res
       console.log(this.roleArray)
      })
  }
  getusers(){
    this._companyservice.getUserdetails().subscribe(res => {
       for (var i = 0; i < res.length; i++) {
         res[i]['ID']=i
       }
       this.username=res
       console.log(this.username)
     })
  }
  hidePopup(){
     this.dialogRef.close(null)
   }

   onAdd(e){
     var addObj=e.data
     console.log(addObj)
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
       addObj['company']=localStorage.selectedCompany
       for (var i = 0; i < this.roleArray.length; i++) {
         if(addObj['name'] == this.roleArray[i]['ID']){
           addObj['role']=this.roleArray[i]['_id']
           break          
         }
       }
       var userid={}
       for (var i = 0; i < this.username.length; i++) {
         if(addObj['email'] == this.username[i]['ID']){
           userid=this.username[i]['_id']
           break          
         }
       }
       delete addObj['__KEY__']
       delete addObj['roleType']
       var userObj={}
       userObj['company'] = addObj['company']
       userObj['role'] = addObj['role']
       this._companyservice.onCreateRole(userObj,userid).subscribe(res => {
           console.log(res)
          this._toaster.info("Userrole Data Submitted","Success", {timeOut: 3000,});
        },error=>{
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });       
     }
   }
   onDelete(e){
     console.log(e)
   }
   onEdit(e){
     var userid = e.data
     var UserObj={}
     UserObj['company']=this.data['_id']
     for (var i = 0; i < this.roleArray.length; i++) {
       if(userid['name'] == this.roleArray[i]['ID']){
         UserObj['role'] = this.roleArray[i]['_id']
       }
     }
     UserObj['userStatus'] = userid['userStatus']
     console.log(UserObj)
     this._companyservice.editrole(userid._id,UserObj).subscribe(res => {
           console.log(res)
          this._toaster.info("Userrole Data Updated","Success", {timeOut: 3000,});
        },error=>{
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });       
   }

}
