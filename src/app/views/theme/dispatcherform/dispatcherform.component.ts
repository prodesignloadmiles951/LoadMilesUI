import { Component, OnInit, Input } from '@angular/core';
import { DispatcherFilters } from '../../../model/dispatcher';
import { DispatcherService } from '../../../services/dispatcher.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dispatcherform',
  templateUrl: './dispatcherform.component.html',
  styleUrls: ['./dispatcherform.component.scss'],
  providers: [DispatcherService]
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

  constructor(private _dispatcherService: DispatcherService, private _toaster: ToastrService,
   private router: Router) { }

  ngOnInit() {
    console.log(this.datatype)
    if(this.datatype == undefined){
      // this.pageFilters=this.dispatchers
      this.mode=true
      this.showAddOption=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']  
      this.dispatcherpaydata.push(this.datatype.payrate)
      this.showAddOption=false    
      this.terminationdate= new Date(this.datatype['terminationdate'])
      this.hiredate= new Date(this.datatype['hiredate'])
      this.dateofbirth= new Date(this.datatype['dateofbirth'])
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
  onAdd(eventName) {
    console.log(eventName.key) 
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

  submit() {
    if(localStorage.selectedCompany == undefined){
       this._toaster.error("Please Select Company","Failed", {timeOut: 2000,});
     }else{
        this.submitted = true;
        var Dispatcherlistdata=this.pageFilters
        Dispatcherlistdata['payrate']=this.payratedata
        Dispatcherlistdata['companyid']=localStorage.selectedCompany
        this._dispatcherService.SendForm(Dispatcherlistdata).subscribe(response => {
          this.submitted = true;
          this._toaster.info("Dispatcherform Data Submitted","Success", {timeOut: 3000,});
         this.router.navigateByUrl("theme/dispatcher-list");
        },error=>{
          this.submitted=false;
          this._toaster.error("Submit Again","Failed", {timeOut: 2000,});
        });
        this.getDispatcherData();
       }
     }
}
