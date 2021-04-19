import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-validateupdatepassword',
  templateUrl: './validateupdatepassword.component.html',
  styleUrls: ['./validateupdatepassword.component.scss'],
  providers: [CompanyService,ToastrService]
})
export class ValidateupdatepasswordComponent implements OnInit {
  isSubmit: boolean;
public Password;
public ConfirmPassword;
  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,private router: Router,public route: ActivatedRoute) { }

  ngOnInit() {
    this.isSubmit = true;
  	console.log(this.route.snapshot.paramMap.get('token'))
  	var validatetoken = this.route.snapshot.paramMap.get('token')
  }
  submit(){
  	var validatetoken = this.route.snapshot.paramMap.get('token')
  	if(this.Password === this.ConfirmPassword){
  			this._companyservice.onPasswordValidate(this.Password,this.ConfirmPassword,validatetoken).subscribe(response => {
                this._toaster.info(response.message,"Success", {timeOut: 3000,});
                this.router.navigateByUrl("/login");
  	})
  	}else{
  		this._toaster.info("Password not matching","Failed", {timeOut: 3000,});
  	}
  
  }
  Login() {
    
  }

}
