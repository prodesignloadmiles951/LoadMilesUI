// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  Login_User: 'LOGIN_USER',
  dashboardurl: 'http://localhost:4200/api/dashboard/',
  url: 'http://54.166.101.176:8081/',
  loginurl: 'http://54.166.101.176:8081/adminapi/login',
  companyurl: 'http://54.166.101.176:8081/companyapi/company',
  trucksurl: 'http://54.166.101.176:8081/trucksapi/trucks',
  trailersurl: 'http://54.166.101.176:8081/trailersapi/trailers',
  driversurl: 'http://54.166.101.176:8081/driversapi/drivers',
  carrierurl: 'http://54.166.101.176:8081/carriersapi/carriers',
  customersurl: 'http://54.166.101.176:8081/customersapi/customers',
  dispatchersurl: 'http://54.166.101.176:8081/dispatchersapi/dispatchers',

  // url:"http://localhost:62585/api/",
  // conurl:"http://localhost:62585/api/Transactions/",
  // dashboardurl:"http://localhost:62585/api/dashboard/",
  // loginurl:"http://localhost:62585/api/Login/",
  // userurl:"http://localhost:62585/api/user/",
  // msgurl:"http://localhost:62585/api/sendmsg/",
  // maskurl:"http://localhost:62585/api/senderid/",

};
