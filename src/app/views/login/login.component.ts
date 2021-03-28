import { Component,OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticationService } from '../authentication.service';
import { AuthHeaderService } from '../authheader.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { RegisterComponent } from '../register/register.component'
import { CompanyService } from '../../services/company.service'

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
  logindetails
  constructor(private _loginsevice: LoginService,
    private authenticate: AuthenticationService,
    private authHeader:AuthHeaderService,
    private cmpservice: CompanyService,
    private router:Router,
    private _toaster: ToastrService,public route: ActivatedRoute) { }

  ngOnInit() {
  console.log(this.route.snapshot.paramMap.get('token'))
  var token=this.route.snapshot.paramMap.get('token')
  if(token != null){
    this.cmpservice.onCompanyValidate(token).subscribe(data => {
      this._toaster.info("Email Validation Successful Please Login","Success", {timeOut: 3000,});
      this.router.navigateByUrl("login");
    })
  }
  }
  Login() {
    this.isLogin=true;
    this._loginsevice.Login(this.Email,this.Password).subscribe(data => {
      this.isLogin=false;
      if (data.status == "SUCCESS!") {
              localStorage.setItem('userId', data._id);
           var usercmpdetails = data['result']['company']
          for (var i = 0; i < usercmpdetails.length; i++) {
            if(usercmpdetails[i]['default']){
              localStorage.setItem('selectedCompany', usercmpdetails[i]['company']);
              localStorage.setItem('role', JSON.stringify(usercmpdetails[i]['role']));
              localStorage.setItem('selectedCompanyName', usercmpdetails[i]['name']);
              if(usercmpdetails['role'] == 5){
                this.router.navigateByUrl('theme/driver-list');
              }
          }
        }
          this.authenticate.setLogin(data);
          this.router.navigateByUrl("dashboard");
      } else {
        this.isLogin=false;
        this._toaster.error("Invalid UserId and Password","Faild");
      }
    },error=>{
      this.isLogin=false;
      this._toaster.error("Invalid UserId and Password","Faild");
    });
  }
  onregister(){
    this.router.navigateByUrl("register");
  }
  oncompanyregister(){
    this.router.navigateByUrl("companyregister");
  }
}
