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
import { exportDataGrid } from 'devextreme/excel_exporter';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoadeditformComponent} from '../dashboard/components/loadeditform/loadeditform.component';
import {StatusFilterPipe} from './statusfilterpipe';
import { AuthenticationService } from '../../views/authentication.service';


@Component({
  selector: 'app-loadstatus',
  templateUrl: './loadstatus.component.html',
  styleUrls: ['./loadstatus.component.scss'],
  providers: [ToastrService, PickupserviceService, DropoffserviceService, CustomersService, DriversService, StatusFilterPipe]
})
export class LoadstatusComponent implements OnInit {
public company: CompanyFilters;
  // public EditMode: boolean = false;
  data: any;
  pageFilters: CompanyFilters;
  statusFilterPipe: StatusFilterPipe;
  selectedCompany: any;
  EditMode: boolean;
  loadDetails=[];
  savyLoadDetails = []
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
        "Name": "Cancelled"
      },
      {
        "ID": 2,
        "Name": "TONU"
      },
      {
        "ID": 3,
        "Name": "Invoiced"
      },
      {
        "ID": 4,
        "Name": "Factored"
      },
      {
        "ID": 5,
        "Name": "Pickup On The Way"
      },
      {
        "ID": 6,
        "Name": "Pickup Delay"
      },
      {
        "ID": 7,
        "Name": "Pickup Ontime"
      },
      {
        "ID": 8,
        "Name": "Loading Delay"
      },
      {
        "ID": 9,
        "Name": "Delay-Loaded"
      },
      {
        "ID": 10,
        "Name": "In Transit"
      },
      {
        "ID": 11,
        "Name": "Delivery Delay"
      },
      {
        "ID": 12,
        "Name": "Delivery Ontime"
      },
      {
        "ID": 13,
        "Name": "Waiting Unload"
      },
      {
        "ID": 14,
        "Name": "Delay-Unloaded"
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
  private authService: AuthenticationService
 ) {
   this.statusFilterPipe = new StatusFilterPipe(),
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
          if (load.lastUpdated.type === 'pickup'){
            this.statusCounts['pickup'] = (this.statusCounts['pickup'] || 0) + 1;
          } else if (load.lastUpdated.type === 'dropoff') {
            this.statusCounts['dropoff'] = (this.statusCounts['dropoff'] || 0) + 1;
          }
          this.statusCounts['loads'] = (this.statusCounts['loads'] || 0) + 1;
          this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] = this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] ? (this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] + 1) : 1;
          console.log(load.lastUpdated.type + '-' + load.lastUpdated.status)
        }
      }
    })
  }

  getData() {
    this.loadDetails=[]
    var session=this.authService.getloginUser()
     console.log(session.company.companyname) 
    this._loadservice.getLoadData().subscribe(data => {
      console.log(data)
      var res=data
      this._customersservice.getCustomersData().subscribe(resp => {
        console.log(resp)
        if (Object.keys(this.statusCounts).length){
          let keys = Object.keys(this.statusCounts);
          keys.forEach(item => {
            this.statusCounts[item] = 0;
          })
        }
        for (var i = 0; i < res.length;i++) {
          if(res[i]['customer'] != undefined || res[i]['customer'] != null){
          if(res[i]['customer'].length > 0 ){
            res[i]['customer_name'] = (res[i]['customer'][0].length > 1 ? res[i]['customer'][0] :resp[res[i]['customer'][0]].companyname)
            if(session.company.companyname == res[i]['company']){
              res[i]['load_number']=res[i]['loadNumber']
              res[i]['pickupinfo']=[]
              res[i]['dropoffinfo']=[]
              res[i]['pickupinfoLength']=0
              res[i]['pickupinfoLength']=0
              if(res[i]['lastUpdated'] != undefined){
              res[i]['loadstatus']=res[i]['lastUpdated']['status']
              }
              this.loadDetails.push(res[i]);
            }
          }
        }
        }
        if(this.loadDetails.length >0){
          var pickup=[]
          var dropup=[]
          this._pickup.getpickupData().subscribe(pickupdata => {
            this.pickupdata = pickupdata
             this._dropoff.getdroppoffData().subscribe(dropupdata => {
              this.dropoffdata = dropupdata
              
              for (var i = 0; i < this.loadDetails.length; i++) {
                this.pickupdata.forEach(item => {
                  if(item.load_id == this.loadDetails[i]['_id']){
                    this.loadDetails[i]['pickupinfo'].push(item)
                    this.loadDetails[i]['pickupinfoLength']=this.loadDetails[i]['pickupinfo'].length
                  }
                })
                this.dropoffdata.forEach(item => {
                  if(item.load_id == this.loadDetails[i]['_id']){
                    this.loadDetails[i]['dropoffinfo'].push(item)
                    this.loadDetails[i]['dropoffinfoLength']=this.loadDetails[i]['dropoffinfo'].length
                  }
                })
                
                if (res[i]['lastUpdated'] != undefined) {
                  this.loadDetails[i]['loadstatus'] = this.loadDetails[i]['lastUpdated']['status'];
                }
              }
              console.log(this.loadDetails);
               this.savyLoadDetails = [...this.loadDetails];
            })
          })
         
          this.setCounts(this.loadDetails);
        }
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
    this.loadDetails = this.statusFilterPipe.transform(this.savyLoadDetails, this.activeFilter);
    console.log(this.loadDetails);
  }

  onEditClick(editdata){   
  console.log(editdata) 
    var editLoad=editdata
    editLoad['EditMode']=true
    editLoad['loadstatusedit']=true
    sessionStorage.setItem('submitID',editdata['_id'])
    let dialogConfig = Object.assign({ width: "1000px" },{ data: editLoad })
    let editDialogRef = this.dialog.open(LoadeditformComponent, dialogConfig);
    editDialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      this.getData()  
      // if(data == null){}else{
      //   this.getData()        
      // }
    })
  }


}


// @Pipe({
//   name: 'statusFilter',
//   pure: false
// })
// export class StatusFilterPipe implements PipeTransform {
//   transform(loadDetails: any[], filter): any {
//     if (!loadDetails || !loadDetails.length || !filter || filter.active === 'loads') {
//       return loadDetails;
//     } else if (filter.active === 'pickups'){
//       return loadDetails.filter(load => load.lastUpdated.type === 'pickup');
//     } else if (filter.active === 'dropoffs') {
//       return loadDetails.filter(load => load.lastUpdated.type === 'dropoff');
//     } else {
//       return loadDetails.filter(load => (load.lastUpdated && load.lastUpdated.status === filter.active && load.lastUpdated.type === filter.type));
//     }
//   }
// }