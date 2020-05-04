export class LoginUser{
    user_id:number;
    username:string;
    user_passwd:string;
    token:string;
    usertype:string;
    salespersonId:number;
    constructor(){
    this.user_id=0;
    this.username=null;
    this.user_passwd=null;
    this.token=null;
    this.usertype=null;
    this.salespersonId=0;
    }
}