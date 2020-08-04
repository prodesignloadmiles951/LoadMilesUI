import { Component, OnInit, Input } from '@angular/core';
import { CarrierService } from './../../../services/carrier.service';
import { CarrierFilters } from '../../../model/carrier';

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

  constructor() { }

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
