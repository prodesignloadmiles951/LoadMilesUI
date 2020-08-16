import { Component, OnInit, Input } from '@angular/core';
import { CarrierService } from './../../../services/carrier.service';
import { CarrierFilters } from '../../../model/carrier';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DriversService } from '../../../services/driver.service';

@Component({
  selector: 'app-carrierform',
  templateUrl: './carrierform.component.html',
  styleUrls: ['./carrierform.component.scss'],
  providers: [CarrierService]
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

  constructor(private _carrierService: CarrierService,private _driverService: DriversService,private _toaster: ToastrService,private router: Router) { }

  ngOnInit() {
     console.log(this.datatype)
    if(this.datatype == undefined){
      // this.pageFilters=this.Carrierlistdata
      this.mode=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']      
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
      if(finalArry.length > 0){
        for (var i = 0; i < finalArry.length; i++) {
          this.finalArry.push(finalArry[i].name)
        }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
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

   submit() {
        this.submitted = true;
        var Carrierlistdata:any=this.pageFilters
        Carrierlistdata['payrate']=this.payrateinfodata
        Carrierlistdata['drugdata']=this.drugdata
        this._carrierService.SendForm(Carrierlistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Carrierform Data Submitted","Success");
         this.router.navigateByUrl("theme/carrier-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed");
        });
        console.log(this.pageFilters);
       }

}
