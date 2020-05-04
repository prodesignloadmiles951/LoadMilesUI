import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginUser } from '../model/loginuser';


@Injectable()
export class AuthenticationService {
    public sessionData: string = environment.Login_User;
    public LoginUser: LoginUser;
    constructor(
        private router: Router
    ) {
        this.LoginUser = new LoginUser();
    }
    logOut(): void {
        sessionStorage.clear();
        localStorage.clear();
        this.clearAuthentication()
    }
    setLogin(loginuser: LoginUser) {
        sessionStorage.setItem(this.sessionData, JSON.stringify(loginuser));
    }
    clearAuthentication() {
        sessionStorage.removeItem(this.sessionData);
    }
    checkUserLoging() {
        if (sessionStorage.getItem(this.sessionData) != null && sessionStorage.getItem(this.sessionData) != undefined) {
            return this.LoginUser = JSON.parse(sessionStorage.getItem(this.sessionData));
        } else {
            return this.LoginUser = null;
        }
    }
    getloginUser() {
        let LoginUser = null;
        LoginUser = JSON.parse(sessionStorage.getItem(this.sessionData));
        if (typeof LoginUser == undefined || LoginUser == null) {
            LoginUser = null;
            this.clearAuthentication();
        }
        return LoginUser;
    }
}