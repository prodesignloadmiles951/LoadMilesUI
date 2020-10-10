import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyFilters } from './../../model/companydetails';
import { CustomersService } from '../../services/customers.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { CreateloadService } from '../../services/createload.service';
import { PickupserviceService } from '../../services/pickupservice.service';
import { DropoffserviceService } from '../../services/dropoffservice.service';
import { DriversService } from '../../services/driver.service';
import {DxButtonModule} from 'devextreme-angular';
import { Pipe, PipeTransform } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoadeditformComponent} from '../dashboard/components/loadeditform/loadeditform.component'


@Component({
  selector: 'app-loadstatus',
  templateUrl: './loadstatus.component.html',
  styleUrls: ['./loadstatus.component.scss'],
  providers: [ToastrService, PickupserviceService, DropoffserviceService, CustomersService, DriversService]
})
export class LoadstatusComponent implements OnInit {
public company: CompanyFilters;
  // public EditMode: boolean = false;
  data: any;
  pageFilters: CompanyFilters;
  selectedCompany: any;
  EditMode: boolean;
  loadDetails=[];
  driverdata= [];
  companydata=[];
  dropoffdata=[];
  pickupdata=[];
  loadsstatus=[
   {
          "ID": 0,
          "Name": "Booked"
      },
      {
          "ID": 1,
          "Name": "ArrivalDelay"
      },
      {
          "ID": 2,
          "Name": "ArrivalOntime"
      },
      {
          "ID": 3,
          "Name": "LoadedDelay"
      },
      {
          "ID": 4,
          "Name": "LoadedOntime"
      },
      {
          "ID": 5,
          "Name": "InTransit"
      },
      {
          "ID": 6,
          "Name": "DeliveryDelay"
      },
      {
          "ID": 7,
          "Name": "DeliveryOntime"
      },
      {
          "ID": 8,
          "Name": "Completed"
      }
  ];
  activeFilter = {
    type: 'loads',
    active: 'loads'
  };
  statusCounts =  Object;


 constructor(
  private router: Router,
  private _customersservice: CustomersService,
  private _toaster: ToastrService,
  private _pickup: PickupserviceService,
  private _dropoff: DropoffserviceService,
  private _driverService: DriversService,
  public dialog: MatDialog,
  private _loadservice: CreateloadService,
 ) {
  this.pageFilters = new CompanyFilters();
   //console.log(this.userData);
 }
  ngOnInit(): void {
    this.getData();
    this.getDriverData()
  }
  viewData(cmp) {
    this.EditMode = false;
    this.company = new CompanyFilters();
    this.company = cmp;
    this.selectedCompany = cmp.companyname;

  }
  getDriverData() {
        this._driverService.getDriversData().subscribe(data => {
          this.driverdata = data;
        });
      }
  onDelete(e){
     console.log(e)
   }
   onEdit(e){
     console.log(e.data)
     this._loadservice.editLoadData(e.data).subscribe(data => {
      console.log(data)
      this._toaster.success("Loads successfully updated", "Success", {timeOut: 3000,});
    },error => {
           this._toaster.error("Company not updated", "Try Again", {timeOut: 2000,});
        })
   }

  setCounts(loads){
    loads.forEach(load => {
      if(load.lastUpdated != undefined){
        if (load.lastUpdated.type && load.lastUpdated.status){
          load.lastUpdated.status = load.lastUpdated.status.replace(/\s/g, '');
          this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] = this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] ? (this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] + 1) : 1;
        }
      }
    })
  }

  getData() {
    this._loadservice.getLoadData().subscribe(data => {
      var res=data
      this._customersservice.getCustomersData().subscribe(resp => {
        for (var i = 0; i < res.length;i++) {
          res[i]['load_number']=1000+i
          if(res[i]['lastUpdated'] != undefined){
          res[i]['loadstatus']=res[i]['lastUpdated']['status']
          }
          res[i]['customer_name'] = ((resp[res[i]['customer'][0] !== 'Select customer' ? res[i]['customer'][0] : parseInt(res[i]['customer'][0])]) || {}).companyname
        }
        
          this.loadDetails = res;
          this._pickup.getpickupData().subscribe(pickupdata => {
            this.pickupdata = pickupdata
             this._dropoff.getdroppoffData().subscribe(dropupdata => {
              this.dropoffdata = dropupdata
              for (var i = 0; i < this.loadDetails.length; i++) {
                 var pickitem = this.pickupdata.map(item => {
                   if(item._id == this.loadDetails[i]._id){
                     this.loadDetails[i]['pickupinfo'] = item
                   }
                 })
                 var dropitem = this.dropoffdata.map(item => {
                 if(item._id == this.loadDetails[i]._id){
                   this.loadDetails[i]['dropoffinfo'] = item
                 }
                })
                 for (var j = 0; j < this.loadsstatus.length; j++) {
                   if(res[i]['lastUpdated'] != undefined){
                     this.loadsstatus[j]['Name'] == this.loadDetails[i]['lastUpdated']['status']
                     this.loadDetails[j]['loadstatus']=this.loadsstatus[j]['ID']
                   }
                   if(this.loadDetails[i]['pickupinfo'] != undefined){
                     this.loadDetails[i]['Driver1']=this.loadDetails[i]['pickupinfo']['Driver1']
                     this.loadDetails[i]['Driver2']=this.loadDetails[i]['pickupinfo']['Driver2']
                     this.loadDetails[i]['ContactNumber']=this.loadDetails[i]['pickupinfo']['ContactNumber']
                     this.loadDetails[i]['Truck']=this.loadDetails[i]['pickupinfo']['Truck']
                     this.loadDetails[i]['pickupaddress']=this.loadDetails[i]['pickupinfo']['Address']
                   }
                   if(this.loadDetails[i]['dropoffinfo'] != undefined){
                     this.loadDetails[i]['dropoffaddress']=this.loadDetails[i]['dropoffinfo']['dropAddress']
                   }
                 }
               }

            })
          })
          console.log(this.loadDetails)
          this.setCounts(this.loadDetails);
      });
     
    });
  }
  Goback() {
    this.router.navigateByUrl('/dashboard');
  }
  createLoad() {
    this.router.navigateByUrl('/dashboard/createload');
  }

  filterLoad(active, type = ''){
    this.activeFilter = {
      active, type
    };
  }
  onEditClick(data){
    console.log(data)
    var loadObj=data
    loadObj['EditMode']=true
    let dialogConfig = Object.assign({ width: "1000px" },{ data: loadObj })
    let editDialogRef = this.dialog.open(LoadeditformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if(data == null){}else{
        this.getData()        
      }
    })
  }


}


@Pipe({
  name: 'statusFilter',
  pure: false
})
export class StatusFilterPipe implements PipeTransform {
  transform(loadDetails: any[], filter): any {
    if (!loadDetails || !loadDetails.length || !filter || filter.active === 'loads') {
      return loadDetails;
    } else if (filter.active === 'pickups'){
      return loadDetails.filter(load => load.lastUpdated.type === 'pickup');
    } else if (filter.active === 'dropoffs') {
      return loadDetails.filter(load => load.lastUpdated.type === 'dropoff');
    } else {
      return loadDetails.filter(load => (load.lastUpdated.status === filter.active && load.lastUpdated.type === filter.type));
    }
  }
}