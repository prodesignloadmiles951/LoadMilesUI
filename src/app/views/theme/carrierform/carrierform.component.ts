import { Component, OnInit, Input, Inject } from '@angular/core';
import { CarrierService } from './../../../services/carrier.service';
import { TrucksService } from '../../../services/trucks.service';
import { CarrierFilters } from '../../../model/carrier';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriversService } from '../../../services/driver.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-carrierform',
  templateUrl: './carrierform.component.html',
  styleUrls: ['./carrierform.component.scss'],
  providers: [CarrierService,DriversService, TrucksService]
})
export class CarrierformComponent implements OnInit {
	public pageFilters={};
    Carrierlistdata = new Array<CarrierFilters>();
    contactdata=[];
    payratedata=[];
    drugmedicaldata=[];
    @Input() datatype;
    mode=false
    finalArry=[]
    typeDetails= [];
    paytypeDetails= [];
    resultDetails= [];
    pageFiltersshow=false;
    submitted: boolean;
    contactinfodata={};
    payrateinfodata={};
    drugdata={};
    driverdata= [];
    showAddOption=false
    medicalcardexpiration=undefined
    cdlexpirytate=undefined
    fileArray=[]
    base64FileArray=[]
    item=''
    filedata={}
    showviewedit=false
    selectedCarrier=true
    showupdate=false
    showsubmit=false

  constructor(public dialogRef: MatDialogRef < CarrierformComponent > ,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _carrierService: CarrierService,private _trucksservice: TrucksService, private _driverService: DriversService,private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {

    if(this.data['EditMode'] == undefined){
      this.mode=true
      this.showAddOption=true
      this.selectedCarrier=false
      this.showsubmit=true
    }else{
      this.mode=this.data['EditMode'] 
      this.pageFilters=this.data
      this.showAddOption=this.data['EditMode'] 
      this.contactdata.push(this.data.contactinfo)
      this.payratedata.push(this.data.payrate)
      this.drugmedicaldata.push(this.data.drugdata)
      this.medicalcardexpiration= new Date(this.data['medicalcardexpiration'])
      this.cdlexpirytate= new Date(this.data['cdlexpirytate'])
      if(this.data['hazmatcertified']){
        this.pageFilters['hazmatcertified']=0
      }else{
        this.pageFilters['hazmatcertified']=1
      }
      if(this.data['EditMode']=true){
        this.showupdate=true
      }
    }

    this.pageFiltersshow=true;
    this.getDriverData()
    this.typeDetails=[
      {
          "ID": 0,
          "Name": "Carrier"
      },
      {
          "ID": 1,
          "Name": "Driver"
      },
      {
          "ID": 2,
          "Name": "Owner"
      }
    ]
    this.paytypeDetails=[
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
     this.resultDetails=[
      {
          "ID": 0,
          "Name": "Pass"
      },
      {
          "ID": 1,
          "Name": "Fail"
      }
    ]
    
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
  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
          console.log(this.driverdata)
        });
      }

  onAdd(eventName) {
    console.log(eventName.key) 
    this.contactinfodata = eventName.key
  }

  onDelete(eventName) {
    console.log(eventName.key)
    this._carrierService.DeleteCarrier(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

  onpayrateAdd(eventName) {
      console.log(eventName.key) 
    this.payrateinfodata = eventName.key
  }
  onpayrateDelete(eventName) {
    console.log(eventName.key)
    this._carrierService.DeleteCarrier(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  ondrugAdd(eventName) {
      console.log(eventName.key) 
    this.drugdata = eventName.key
  }
  ondrugDelete(eventName) {
    console.log(eventName.key)
    this._carrierService.DeleteCarrier(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

  onmedcardexpdateselect(event) {
    var medexpdate = new Date(event.target.value).getTime()
    this.pageFilters['medicalcardexpiration'] = medexpdate
  }
  oncdlexpdateselect(event) {
    var cdlexpdate = new Date(event.target.value).getTime()
    this.pageFilters['cdlexpirytate'] = cdlexpdate
  }
  hidePopup(){
     this.dialogRef.close(null)
   }
   update() {
     this._carrierService.EditCarrier(this.data).subscribe(res => {
         this._toaster.info("Carrier Data Updated successfully","Success", {timeOut: 3000,});
         this.dialogRef.close(null)
         },error=>{
          this._toaster.error("Carrier Data Not Updated","Failed", {timeOut: 2000,});
          this.dialogRef.close(null)
     })
   }

   submit() {
     if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Carrierlistdata:any=this.pageFilters
        Carrierlistdata['contactinfo']=this.contactinfodata
        Carrierlistdata['payrate']=this.payrateinfodata
        Carrierlistdata['drugdata']=this.drugdata
        Carrierlistdata['companyid']=localStorage.selectedCompany
        var idArry=[]
        for (var i = 0; i < this.finalArry.length; ++i) {
          idArry.push(this.finalArry[i]._id)
        }
        Carrierlistdata['files']=idArry
        this._carrierService.SendForm(Carrierlistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Carrierform Data Submitted","Success", {timeOut: 3000,});
         this.router.navigateByUrl("theme/carrier-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
        console.log(this.pageFilters);
       }
     }

}
