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
    terminationDate=undefined
    hireDate=undefined
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
  	localStorage.getItem('selectedCompany')
  	console.log(localStorage.getItem('selectedCompany'))
    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedDispatcher=false
      this.showsubmit=true
      this.pageFilters['address']={}
      this.pageFilters['account']={}
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.dispatcherpaydata.push(this.data.payrate)
      this.terminationDate= new Date(this.data['terminationDate'])
      this.hireDate= new Date(this.data['hireDate'])
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
  onhireDate(event) {
    var hireDate = new Date(event.target.value).getTime()
    this.pageFilters['hireDate'] = hireDate
  }
  onterminationDate(event) {
    var terminationDate = new Date(event.target.value).getTime()
    this.pageFilters['terminationDate'] = terminationDate
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
     this.btnHide=true
    delete this.data['companyId']
    delete this.data['createdAt']
    delete this.data['updatedAt']
    delete this.data['EditMode']

     this._dispatcherService.EditDispatcher(this.data,this.data['_id']).subscribe(res => {
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
   
   }
   reset(){}
  submit() {
    
        this.submitted = true;
        var Dispatcherlistdata=this.pageFilters
        Dispatcherlistdata['payrate']=this.payratedata
        Dispatcherlistdata['companyId']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Dispatcherlistdata['files']=idArry
        this.btnHide=true
        var obj={}
        obj['line']=this.pageFilters['address']['line']
        obj['line1']=this.pageFilters['address']['line1']
        obj['city']=this.pageFilters['address']['city']
        obj['state']=this.pageFilters['address']['state']
        obj['zip']=this.pageFilters['address']['zip']
        Dispatcherlistdata['address']=obj
        var bankdata={}
        bankdata['bankname']=this.pageFilters['account']['bankname']
        bankdata['accountnum']=this.pageFilters['account']['accountnum']
        bankdata['accounttype']=this.pageFilters['account']['accounttype']
        Dispatcherlistdata['account']=bankdata

         var addobj={}
              addobj['line']=Dispatcherlistdata['line']
              addobj['line1']=Dispatcherlistdata['line1']
              addobj['city']=Dispatcherlistdata['city']
              addobj['state']=Dispatcherlistdata['state']
              addobj['zip']=Dispatcherlistdata['zip']
              addobj['country']=Dispatcherlistdata['country']
              delete Dispatcherlistdata['line']
              delete Dispatcherlistdata['line1']
              delete Dispatcherlistdata['city']
              delete Dispatcherlistdata['state']
              delete Dispatcherlistdata['zip']
              delete Dispatcherlistdata['country']
              Dispatcherlistdata['address']=addobj

              var account={}
              account['bankname']=Dispatcherlistdata['bankname']
              account['accountnumber']=Dispatcherlistdata['accountnumber']
              account['acctype']=Dispatcherlistdata['acctype']

              delete Dispatcherlistdata['accountnumber']
              delete Dispatcherlistdata['bankname']
              delete Dispatcherlistdata['acctype']

              Dispatcherlistdata['account']= account

        

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
        this.getDispatcherData();
     }
}
