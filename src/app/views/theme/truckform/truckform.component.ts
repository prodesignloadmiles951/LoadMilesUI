import { Component, OnInit,Input,ViewChild,Output,EventEmitter } from '@angular/core';
import { TrucksFilters } from '../../../model/trucks';
import { TrucksService } from '../../../services/trucks.service';
import { DriversService } from '../../../services/driver.service';
import { DispatcherService } from '../../../services/Dispatcher.service';
import { TrailerService } from '../../../services/trailers.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truckform',
  templateUrl: './truckform.component.html',
  styleUrls: ['./truckform.component.scss'],
  providers: [TrucksService, TrailerService, DispatcherService, DriversService, ToastrService]
})
export class TruckformComponent implements OnInit {
	public trucks: TrucksFilters;
    // public pageFilters: TrucksFilters;
    pageFilters={}
    maintenancedata=[];
    Truckslistdata = new Array<TrucksFilters>();
    @Input() datatype;
    mode=false
    finalArry=[]
    driverdata= [];
    Dispatcherdata= [];
    trailerData= [];
    unitNumberdata: any;
    categoryDetails= [];
    truckinfo= [];
    submitted: boolean;
    pageFiltersshow= false;
    item=''
    itemShow=false
    @Output() changed = new EventEmitter();
    @ViewChild(PdfViewerComponent, { static: true}) private pdfComponent: PdfViewerComponent;

  constructor(private _trucksservice: TrucksService,
        private _driverService: DriversService,
        private _trailersService: TrailerService,
        private _dispatcherService: DispatcherService,
        private _toaster: ToastrService,
        private router: Router
        ) { }

  ngOnInit() {
    this.getDriverData()
    this.getDispatcherData()
    this.getTrailerData()
    console.log(this.datatype)
    if(this.datatype == undefined){
      this.pageFilters=this.Truckslistdata
      this.mode=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']      
    }
    this.pageFiltersshow=true
    this.categoryDetails=[
      {
          "ID": 0,
          "Name": "Maintenance"
      },
      {
          "ID": 1,
          "Name": "Repairs"
      },
      {
          "ID": 2,
          "Name": "Rebuild"
      }
    ]
    this.changed.emit(this.pageFilters)
  }
   
  addfiles(e){
      var finalArry=e.target.files
      console.log(finalArry)
       const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(finalArry[0]);
      if(finalArry.length > 0){
        for (var i = 0; i < finalArry.length; i++) {
          this.finalArry.push(finalArry[i].name)
        }
        sessionStorage.setItem('file_upload',JSON.stringify(this.finalArry))
        this.finalArry=JSON.parse(sessionStorage.file_upload)
      }
  }
  handleReaderLoaded(e) {
        var string = btoa(e.target.result);
        this.item= string
        console.log(this.item)
        this._trucksservice.uploadFile(this.item).subscribe(response => {
          
        },error=>{
          this._toaster.error("Submit Again","Failed");
        });
    }
    onView(){
      console.log(this.item)
      this.itemShow=true
      setTimeout(()=>{
           this.pdfComponent.pdfFindController.executeCommand('find', {
               caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: false
           });     
        }, 100)
    }
    ondelete(data){
      console.log(data)
      this.finalArry.splice(data,1)
    }

   getDispatcherData() {
    this._dispatcherService.getDispatcherData().subscribe(data => {
      this.Dispatcherdata = data;
    });
  }

  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
          console.log(this.driverdata)
        });
      }
  getTrailerData() {
        this._trailersService.getTrailersData().subscribe(data => {
          this.trailerData = data;
        });
      } 
       getData() {
    this._trucksservice.getTrucksData().subscribe(data => {
      this.unitNumberdata = data;
    });
  }

  submit() {
    this.submitted = true;
    var Truckslistdata:any = this.pageFilters
    this._trucksservice.SendForm(Truckslistdata).subscribe(response => {
      this.submitted = true;
      this._toaster.info("Truck Data Submitted","Success");
      this.router.navigateByUrl("theme/trucks-list");
    },error=>{
      this.submitted=false;
      this._toaster.error("Submit Again","Failed");
    });
    this.getData()
   }
     
}
