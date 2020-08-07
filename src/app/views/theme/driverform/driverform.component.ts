import { Component, OnInit, Input } from '@angular/core';
import { DriverFilters } from '../../../model/driver';
import { DriversService } from './../../../services/driver.service';

@Component({
  selector: 'app-driverform',
  templateUrl: './driverform.component.html',
  styleUrls: ['./driverform.component.scss'],
  providers: [DriversService ]
})
export class DriverformComponent implements OnInit {
	pageFilters={};
  Driverlistdata = new Array<DriverFilters>();
  payratedata=[];
  drugandmedicaldata=[];
  @Input() datatype;
  mode=false
  finalArry=[]

  constructor(private _driverService: DriversService,) { }

  ngOnInit() {
    console.log(this.datatype)
    if(this.datatype == undefined){
      this.pageFilters=this.Driverlistdata
      this.mode=true
    }else{
      this.pageFilters=this.datatype
      this.mode=this.datatype['EditMode']      
    }
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

}
