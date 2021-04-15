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
public Password;
public ConfirmPassword;
  constructor(private _toaster: ToastrService,
     private _companyservice: CompanyService,private router: Router,public route: ActivatedRoute) { }

  ngOnInit() {
  	console.log(this.route.snapshot.paramMap.get('token'))
  	var validatetoken = this.route.snapshot.paramMap.get('token')
  }
  submit(){
  	var validatetoken = this.route.snapshot.paramMap.get('token')
  	if(this.Password === this.ConfirmPassword){
  			this._companyservice.onPasswordValidate(validatetoken,this.Password,this.ConfirmPassword).subscribe(response => {
  		if(response.status == "SUCCESS!"){
                this._toaster.info(response.result,"Success", {timeOut: 3000,});
                this.router.navigateByUrl("/login");
              }else{
                this._toaster.error(response.error,"Failed", {timeOut: 2000,});
              }
  	})
  	}else{
  		this._toaster.info("Password not matching","Failed", {timeOut: 3000,});
  	}
  
  }

}
