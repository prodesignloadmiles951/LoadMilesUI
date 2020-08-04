import { Component, OnInit,Input } from '@angular/core';
import { TrucksFilters } from '../../../model/trucks';
import { TrucksService } from '../../../services/trucks.service';

@Component({
  selector: 'app-truckform',
  templateUrl: './truckform.component.html',
  styleUrls: ['./truckform.component.scss'],
  providers: [TrucksService]
})
export class TruckformComponent implements OnInit {
	public trucks: TrucksFilters;
    pageFilters={}
    maintenancedata=[];
    Truckslistdata = new Array<TrucksFilters>();
    @Input() datatype;
    mode=false
    finalArry=[]

  constructor(private _trucksservice: TrucksService,) { }

  ngOnInit() {
    console.log(this.datatype)
    this.pageFilters=this.datatype
    this.mode=this.datatype['EditMode']
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
