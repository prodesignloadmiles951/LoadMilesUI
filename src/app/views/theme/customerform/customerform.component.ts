import { Component, OnInit, Input, Inject } from '@angular/core';
import { CustomersService } from './../../../services/customers.service';
import { CustomersFilters } from './../../../model/customers';
import { TrucksService } from '../../../services/trucks.service';
import { TrailerService } from '../../../services/trailers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss'],
  providers: [CustomersService, TrucksService, TrailerService]
})
export class CustomerformComponent implements OnInit {
	public pageFilters={};
    public customers: CustomersFilters;
    Customerslistdata = new Array<CustomersFilters>();
    customerdata=[];
    @Input() datatype;
    mode=false
    finalArry=[]
    pageFiltersshow=false;
    submitted: boolean;
    contactinfodata={};
    showAddOption=false
    fileArray=[]
    base64FileArray=[]
    item=''
    filedata={}
    showviewedit=false
    selectedCustomer=true
    showupdate=false
    showsubmit=false
    changeUplaod=true
    editFileList=[]
    btnHide=false
    customerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef < CustomerformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _customersservice: CustomersService, private _trailersService: TrailerService, private _trucksservice: TrucksService, private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {
     if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedCustomer=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.customerdata.push(this.data.contactinfodata)
      this.changeUplaod=false
      if(this.data['EditMode']){
        this.showupdate=true
        this.editFileList=this.data['files']
      }
    }
    this.pageFiltersshow=true;

    if(this.data['files'] != undefined){
      this._trailersService.getFileList().subscribe(response => {
          console.log(response)
          this.editFileList=[]
          var fileArray=response.data
          fileArray.forEach(element => {
            var arr=this.data['files']
            for (var i = 0; i < arr.length; i++) {
              if(element['_id'] == arr[i]){
                this.editFileList.push(element)
              }            
            }
          });        
        },error=>{
          console.log(error)
        });
    }
  }

   addfiles(e){
      var finalArry=e.target.files
      this.base64FileArray=[]
      this.fileArray=finalArry
        if(finalArry.length > 0){
          for (var i = 0; i < finalArry.length; i++) {
            var objFile={}
            objFile['name']=finalArry[i]['name']
            objFile['size']=finalArry[i]['size']
            objFile['type']=finalArry[i]['type']
            this.finalArry.push(objFile) 
            const reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(finalArry[i]);
          }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
  }
  handleReaderLoaded(e,name) {
    this.item=''
    var string = btoa(e.target.result);
    this.item= "data:application/vnd.ms-excel;base64,"+string
    var obj={}
    obj['file']=this.item
    this.base64FileArray.push(obj)
  }
  onUploadFile(){
      let arr3 = this.finalArry.map((item, i) => Object.assign({}, item, this.base64FileArray[i]));
      this._trucksservice.uploadFile(arr3).subscribe(response => {
        var uploadArry=response.data
        this.finalArry=uploadArry
        this.filedata = response
        if(response.Status == "ok"){
          this.showviewedit=true
        }
      },error=>{
        this._toaster.error("Submit Again","Failed");
      });
    }

    onView(data){
        let baseUrl = this.filedata['base_url'];
        let url = baseUrl + data.fileName;   
        window.open(url, '_blank');
    }
    ondelete(data){
      this.finalArry.splice(data,1)
    }

  onAdd(eventName) {
    console.log(eventName.key) 
    this.contactinfodata = eventName.key
  }
  onEdit(eventName){
    this.contactinfodata = eventName.key
  }
  onDelete(eventName) {
    console.log(eventName.key)
    this._customersservice.DeleteCustomers(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  hidePopup(){
     this.dialogRef.close(null)
   }
   update() {
     if(this.editFileList.length > 0){
      var array = this.finalArry.concat(this.editFileList);
      var idArry=[]
        for (var i = 0; i < array.length; ++i) {
          idArry.push(array[i]._id)
        }
      this.data['files']=idArry
    }
    if(this.finalArry.length > 0 && this.editFileList.length == 0){
     var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
     this.data['files']=idArry
    }
    if(this.data['contactinfodata'] == undefined){
     this.data['contactinfodata']=this.contactinfodata
    }
     console.log(this.data)
     if(this.pageFilters['mcsf'] != undefined && this.pageFilters['mcsf'] != ""){
          this.btnHide=true
     this._customersservice.EditCustomers(this.data).subscribe(res => {
         this._toaster.info("Customer Data Updated successfully","Success", {timeOut: 3000,});
         this.btnHide=false
         this.dialogRef.close(res)
         },error=>{
          this._toaster.error("Customer Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
   }else{
     this._toaster.error("Enter MC Details","Failed", {timeOut: 2000,});
   }
   }

   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Customerslistdata:any=this.pageFilters
        Customerslistdata['contactinfodata']=this.contactinfodata
        Customerslistdata['companyid']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Customerslistdata['files']=idArry
        if(this.pageFilters['mcsf'] != undefined && this.pageFilters['mcsf'] != ""){
          this.btnHide=true
        this._customersservice.SendForm(Customerslistdata).subscribe(response => {
          if(response.Status != "error"){
            this.submitted = true;
            this._toaster.info("Customerform Data Submitted","Success", {timeOut: 3000});
            this.btnHide=false
           this.dialogRef.close(response)
          }else{
            this.submitted=false;
            this._toaster.info(response.error,"Failed", {timeOut: 2000});
          }
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit again","Failed", {timeOut: 2000});
        });
      }else{
        this._toaster.error("Enter MC Details","Failed", {timeOut: 2000});
       }
        console.log(this.pageFilters);
       }
     }
     reset(){}

}
