import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropoff',
  templateUrl: './dropoff.component.html',
  styleUrls: ['./dropoff.component.scss']
})
export class DropoffComponent implements OnInit {
  data=[]
  drivertypeDetails=[]
  typeDetails=[]
  driverDetails=[]
  trailerDetails=[]
  truckDetails=[]
  loadstatusDetails=[]
  constructor() { }

  logEvent(e){
    
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
