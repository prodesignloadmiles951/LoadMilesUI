import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  providers: [CompanyService,ToastrService]
})
export class ForgotpasswordComponent implements OnInit {
  public isSubmit:boolean=false;
  public Email: any;


  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,private router: Router) { }

  ngOnInit() {
  }

  submit(){
    this.isSubmit=true;
  	this._companyservice.forgotpassword(this.Email).subscribe(response => {
  		if(response.status == "SUCCESS!"){
                this._toaster.info(response.result,"Success", {timeOut: 3000,});
                this.router.navigateByUrl("/login");
              }else{
                this._toaster.error(response.error,"Failed", {timeOut: 2000,});
              }
  	})
  }

  Login() {
    
  }

}
