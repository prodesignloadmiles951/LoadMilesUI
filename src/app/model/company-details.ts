export class CompanyFilters{
   companyname: string;
   dba: string;
   mc: string;
   fein: string;
   phone: number;
   fax: number;
   email: string;
   website: string;
   iftalicence: string;
   usdot: string;

   constructor(){
      this.companyname=null;
      this.dba=null;
      this.mc=null;
      this.fein=null;
      this.phone=0;
      this.fax=null;
      this.email=null;
      this.website=null;
      this.iftalicence=null;
      this.usdot=null;
      }
}