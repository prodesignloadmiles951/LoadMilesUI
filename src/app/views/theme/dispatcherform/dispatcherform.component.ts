import { Component, OnInit, Input } from '@angular/core';
import { DispatcherFilters } from '../../../model/dispatcher';
import { DispatcherService } from '../../../services/Dispatcher.service';

@Component({
  selector: 'app-dispatcherform',
  templateUrl: './dispatcherform.component.html',
  styleUrls: ['./dispatcherform.component.scss'],
  providers: [DispatcherService]
})
export class DispatcherformComponent implements OnInit {
	 public pageFilters= {};
    public dispatchers: DispatcherFilters;
    Dispatcherlistdata = new Array<DispatcherFilters>();
    typeDetails=[];
    dispatcherpaydata=[];
    @Input() datatype;
    mode=false
    finalArry=[]

  constructor(private _dispatcherService: DispatcherService) { }

  ngOnInit() {
    console.log(this.datatype)
    if(this.datatype == undefined){
      this.pageFilters=this.Dispatcherlistdata
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
