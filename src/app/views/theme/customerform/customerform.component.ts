import { Component, OnInit, Input, Inject } from '@angular/core';
import { CustomersService } from './../../../services/customers.service';
import { CustomersFilters } from './../../../model/customers';
import { TrucksService } from '../../../services/trucks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss'],
  providers: [CustomersService, TrucksService]
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

  constructor(public dialogRef: MatDialogRef < CustomerformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _customersservice: CustomersService, private _trucksservice: TrucksService, private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {
     if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedCustomer=false
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.customerdata.push(this.data.contactinfodata)
    }
    this.pageFiltersshow=true;
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

  onDelete(eventName) {
    console.log(eventName.key)
    this._customersservice.DeleteCustomers(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  hidePopup(){
     this.dialogRef.close(null)
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
        this._customersservice.SendForm(Customerslistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Customerform Data Submitted","Success", {timeOut: 3000,});
         this.router.navigateByUrl("theme/customers-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
        console.log(this.pageFilters);
       }
     }

}
