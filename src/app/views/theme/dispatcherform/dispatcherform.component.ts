import { Component, OnInit, Input, Inject } from '@angular/core';
import { DispatcherFilters } from '../../../model/dispatcher';
import { DispatcherService } from '../../../services/dispatcher.service';
import { TrucksService } from '../../../services/trucks.service';
import { TrailerService } from '../../../services/trailers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dispatcherform',
  templateUrl: './dispatcherform.component.html',
  styleUrls: ['./dispatcherform.component.scss'],
  providers: [DispatcherService, TrucksService, TrailerService]
})
export class DispatcherformComponent implements OnInit {
	 pageFilters={}
    public dispatchers: DispatcherFilters;
    Dispatcherlistdata = new Array<DispatcherFilters>();
    typeDetails=[];
    dispatcherpaydata=[];
    @Input() datatype;
    mode=false
    finalArry=[]
    pageFiltersshow=false;
    submitted: boolean;
    payratedata={}
    Dispatcherdata= [];
    showAddOption=false
    terminationdate=undefined
    hiredate=undefined
    dateofbirth=undefined
    fileArray=[]
    base64FileArray=[]
    item=''
    filedata={}
    showviewedit=false
    selectedDispatcher=true
    showupdate=false
    showsubmit=false
    changeUplaod=true
    editFileList=[]
    btnHide=false
    dispatcherForm: FormGroup;

  constructor(public dialogRef: MatDialogRef < DispatcherformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
    private _dispatcherService: DispatcherService, private _trailersService: TrailerService, private _trucksservice: TrucksService, private _toaster: ToastrService,
   private router: Router) { }

  ngOnInit() {
    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedDispatcher=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.dispatcherpaydata.push(this.data.payrate)
      this.terminationdate= new Date(this.data['terminationdate'])
      this.hiredate= new Date(this.data['hiredate'])
      this.dateofbirth= new Date(this.data['dateofbirth'])
      this.changeUplaod=false
      if(this.data['EditMode']){
        this.showupdate=true
        this.editFileList=this.data['files']
      }
    }

    this.pageFiltersshow=true
    this.typeDetails=[
      {
          "ID": 0,
          "Name": "Per Hour"
      },
      {
          "ID": 1,
          "Name": "Per Mile"
      },
      {
          "ID": 2,
          "Name": "Percentage(%)"
      }
    ]

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
    this.payratedata = eventName.key
  }
  onEdit(eventName){
    this.payratedata = eventName.key
  }

  onDelete(eventName) {
    console.log(eventName.key)
    this._dispatcherService.DeleteDispatcher(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data;
    });
  }
  ondateofbirth(event) {
    var birthdate = new Date(event.target.value).getTime()
    this.pageFilters['dateofbirth'] = birthdate
  }
  onhiredate(event) {
    var hiredate = new Date(event.target.value).getTime()
    this.pageFilters['hiredate'] = hiredate
  }
  onterminationdate(event) {
    var terminationdate = new Date(event.target.value).getTime()
    this.pageFilters['terminationdate'] = terminationdate
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
    if(this.data['payrate'] == undefined){
     this.data['payrate']=this.payratedata
    }
     console.log(this.data)
     if(this.pageFilters['ssn'] != undefined && this.pageFilters['ssn'] != ""){
     this.btnHide=true
     this._dispatcherService.EditDispatcher(this.data).subscribe(res => {
       if(res.Status == "error"){
                  this._toaster.error(res.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
         this._toaster.info("Dispatcher Data Updated successfully","Success", {timeOut: 3000,});
         this.btnHide=false
         this.dialogRef.close(res)
       }
         },error=>{
          this._toaster.error("Dispatcher Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
   }else{
     this._toaster.error("Enter SSN Details","Failed", {timeOut: 2000,});
   }
   }
   reset(){}
  submit() {
    if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Dispatcherlistdata=this.pageFilters
        Dispatcherlistdata['payrate']=this.payratedata
        Dispatcherlistdata['companyid']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Dispatcherlistdata['files']=idArry
        if(this.pageFilters['ssn'] != undefined && this.pageFilters['ssn'] != ""){
        this.btnHide=true
        this._dispatcherService.SendForm(Dispatcherlistdata).subscribe(response => {
          if(response.Status == "error"){
                  this._toaster.error(response.error,"Failed", {timeOut: 2000,});
                  this.btnHide=false
                }else{
          this.submitted = true;
          this._toaster.info("Dispatcherform Data Submitted","Success", {timeOut: 3000,});
          this.btnHide=false
         this.dialogRef.close(response)
                }
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
      }else{
     this._toaster.error("Enter SSN Details","Failed", {timeOut: 2000,});
   }
        this.getDispatcherData();
       }
     }
}
