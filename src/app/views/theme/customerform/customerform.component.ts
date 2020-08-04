import { Component, OnInit, Input } from '@angular/core';
import { CustomersService } from './../../../services/customers.service';
import { CustomersFilters } from './../../../model/customers';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss'],
  providers: [CustomersService]
})
export class CustomerformComponent implements OnInit {
	public pageFilters={};
    public customers: CustomersFilters;
    Customerslistdata = new Array<CustomersFilters>();
    customerdata=[];
    @Input() datatype;
    mode=false
    finalArry=[]

  constructor(private _customersservice: CustomersService) { }

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
