import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticationService } from '../authentication.service';
import { AuthHeaderService } from '../authheader.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [LoginService,AuthenticationService,AuthHeaderService,ToastrService]
})
export class LoginComponent {
  public Username: string;
  public Password: string;
  public Usertype: string;
  public isLogin:boolean=false;
  constructor(private _loginsevice: LoginService,
    private authenticate: AuthenticationService,
    private authHeader:AuthHeaderService,
    private router:Router,
    private _toaster: ToastrService) {
      this.Usertype="";
  }
  Login() {
    this.isLogin=true;
    this._loginsevice.Login(this.Username, this.Password, this.Usertype).subscribe(reponse => {
      let user = {
        user_id: reponse.user_id,
        username: reponse.username,
        user_passwd: reponse.user_passwd,
        token: reponse.token,
        usertype: reponse.usertype,
        salespersonId: reponse.salespersonId,
      }
      this.router.navigateByUrl("dashboard");
      
      if(user){
        this.router.navigateByUrl("dashboard");
      }
      else{
        this._toaster.warning("Invalid UserId and Password","Login Faild")
      }
      this.isLogin=false;
    },error=>{
      this.isLogin=false;
      this._toaster.error("Invalid UserId and Password","Faild")
    });
  }
}
