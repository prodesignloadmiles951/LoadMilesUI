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
  public Email: string;
  public Password: string;
  public isLogin:boolean=false;
  username: any;
  userdetails: any;
  constructor(private _loginsevice: LoginService,
    private authenticate: AuthenticationService,
    private authHeader:AuthHeaderService,
    private router:Router,
    private _toaster: ToastrService) { }
  Login() {
    this.isLogin=true;
    this._loginsevice.Login(this.Email,this.Password).subscribe(data => {
      this.isLogin=false;
      this.authenticate.setLogin(data)
      this.router.navigateByUrl("dashboard");
    },error=>{
      this.isLogin=false;
      this._toaster.error("Invalid UserId and Password","Faild")
    });
  }
}
