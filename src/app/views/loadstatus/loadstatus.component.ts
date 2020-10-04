import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyFilters } from './../../model/companydetails';
import { CustomersService } from '../../services/customers.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { CreateloadService } from '../../services/createload.service';
import { PickupserviceService } from '../../services/pickupservice.service';
import { DropoffserviceService } from '../../services/dropoffservice.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-loadstatus',
  templateUrl: './loadstatus.component.html',
  styleUrls: ['./loadstatus.component.scss'],
  providers: [ToastrService, PickupserviceService, DropoffserviceService, CustomersService]
})
export class LoadstatusComponent implements OnInit {
public company: CompanyFilters;
  // public EditMode: boolean = false;
  data: any;
  pageFilters: CompanyFilters;
  selectedCompany: any;
  EditMode: boolean;
  loadDetails=[];
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
  private _loadservice: CreateloadService,
 ) {
  this.pageFilters = new CompanyFilters();
   //console.log(this.userData);
 }
  ngOnInit(): void {
    this.getData();
  }
  viewData(cmp) {
    this.EditMode = false;
    this.company = new CompanyFilters();
    this.company = cmp;
    this.selectedCompany = cmp.companyname;

  }
  onEditingStart(){}
  onRowInserted(){}
  onRowUpdated(){}
  onRowRemoved(){}

  setCounts(loads){
    loads.forEach(load => {
      if (load.lastUpdated.type && load.lastUpdated.status){
        load.lastUpdated.status = load.lastUpdated.status.replace(/\s/g, '');
        this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] = this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] ? (this.statusCounts[load.lastUpdated.type + '-' + load.lastUpdated.status] + 1) : 1;
      }
    })
  }

  getData() {
    this._loadservice.getLoadData().subscribe(data => {
      var res=data
      this._customersservice.getCustomersData().subscribe(resp => {
        for (var i = 0; i < res.length;i++) {
          res[i]['load_number']=1000+i
          res[i]['loadstatus']=res[i]['lastUpdated']['status']
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
                   if(this.loadsstatus[j]['Name'] == this.loadDetails[i]['lastUpdated']['status']){
                     this.loadDetails[i]['loadstatus']=this.loadsstatus[j]['ID']
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