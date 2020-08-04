import { Component, OnInit, Input } from '@angular/core';
import { TrailersFilters } from '../../../model/trailers';
import { TrailerService } from '../../../services/trailers.service';

@Component({
  selector: 'app-trailerform',
  templateUrl: './trailerform.component.html',
  styleUrls: ['./trailerform.component.scss'],
  providers: [TrailerService]
})
export class TrailerformComponent implements OnInit {
	pageFilters={};
	Trailerslistdata = new Array<TrailersFilters>();
	@Input() datatype;
    mode=false
    finalArry=[]

  constructor(private _trailersService: TrailerService,) { }

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
