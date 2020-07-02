import { Component, OnInit,Input } from '@angular/core';
import { CreateloadService } from '../../../../services/createload.service'

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  data=[]
  drivertypeDetails=[]
  driverDetails=[]
  typeDetails=[]
  trailerDetails=[]
  truckDetails=[]
  loadstatusDetails=[]
  constructor(private _loadservice: CreateloadService) { }

  onAdd(eventName) {
    console.log(eventName.key)
    this._loadservice.addLoadData(eventName.key).subscribe(data => {
      console.log(data)
    });
  }
  onEdit(eventName) {
    console.log(eventName.key)
    var obj=eventName.key
    console.log(obj.PickupDate)
    var date=obj.PickupDate
    console.log(date.getTime())
    // this._loadservice.editLoadData(eventName.key).subscribe(data => {
    //   console.log(data)
    // });
  }
  onDelete(eventName) {
    console.log(eventName.key)
    this._loadservice.deleteLoadData(eventName.key).subscribe(data => {
      console.log(data)
    });
  }

  ngOnInit() {
  	this.drivertypeDetails=[
      {
          "ID": 0,
          "Name": "Solo"
      },
      {
          "ID": 1,
          "Name": "Team"
      }
    ]
    this.driverDetails=[
      {
          "ID": 0,
          "Name": "Dan"
      },
      {
          "ID": 1,
          "Name": "Steve"
      },
      {
          "ID": 2,
          "Name": "Max"
      }
    ]
    this.typeDetails=[
      {
          "ID": 0,
          "Name": "Driver"
      },
      {
          "ID": 1,
          "Name": "Carrier"
      }
    ]
    this.trailerDetails=[
      {
          "ID": 0,
          "Name": "FLB654"
      },
      {
          "ID": 1,
          "Name": "GXV5654"
      },
      {
          "ID": 2,
          "Name": "KLO767"
      }
    ]
    this.truckDetails=[
      {
          "ID": 0,
          "Name": "FLB654"
      },
      {
          "ID": 1,
          "Name": "GXV5654"
      },
      {
          "ID": 2,
          "Name": "KLO767"
      }
    ]
    this.loadstatusDetails=[
      {
          "ID": 0,
          "Name": "Booked"
      },
      {
          "ID": 1,
          "Name": "Arrival Delay"
      },
      {
          "ID": 2,
          "Name": "Arrival Ontime"
      },
      {
          "ID": 3,
          "Name": "Loaded Delay"
      },
      {
          "ID": 4,
          "Name": "Loaded Ontime"
      },
      {
          "ID": 5,
          "Name": "In Transit"
      },
      {
          "ID": 6,
          "Name": "Delivery Delay"
      },
      {
          "ID": 7,
          "Name": "Delivery Delay"
      },
      {
          "ID": 8,
          "Name": "Completed"
      }
    ]
  }

}
