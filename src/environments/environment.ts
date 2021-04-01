// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// const currentEnv = 'http://localhost'; //local
const currentEnv = 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com'; //dev Env

export const environment = {
  production: false,
  Login_User: 'LOGIN_USER',
  dashboardurl: 'http://localhost:4200/api/dashboard/',
  URL: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api',
  url: 'http://3.139.89.46:8081/',
  loginurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/user/login',
  companyurl: 'http://3.139.89.46:8081/companyapi/company',
  trucksurl: 'http://3.139.89.46:8081/trucksapi/trucks',
  trailersurl: 'http://3.139.89.46:8081/trailersapi/trailers',
  // driversurl: 'http://3.139.89.46:8081/driversapi/drivers',
  driversurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/driver',
  dispatchersurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/dispatcher',
  carrierurl: 'http://3.139.89.46:8081/carriersapi/carriers',
  customersurl: 'http://3.139.89.46:8081/customersapi/customers',
  getloadsurl: 'http://3.139.89.46:8081/loadsapi/loads',
  pickupform: 'http://3.139.89.46:8081/pickupapi/pickup',
  dropoffform: 'http://3.139.89.46:8081/dropoffapi/dropoff',
  // uploadUrl:'http://ec2-54-166-101-176.compute-1.amazonaws.com:8081/fileapi/file'
  uploadUrl:'http://3.139.89.46:8081/fileapi/file',
  postalcodeUrl:'http://3.139.89.46:8081/fileapi/postal_code?postal_code=',
  roledetailsUrl: 'http://3.139.89.46:8081/roleapi/role',
  newcompanyurl: currentEnv + ':5000/api/company',
  newcompanycreateurl: 'http://3.139.89.46:8081/companyapi/company/',
  userdetailsurl: 'http://3.139.89.46:8081/userapi/user',
  vendorurl: 'http://3.139.89.46:8081/vendorapi/vendor',
  fuelCardurl: 'http://3.139.89.46.176:8081/fuelCardapi/fuelCard',
  factorurl: 'http://3.139.89.46:8081/factorapi/factor',
  currencyurl: 'http://3.139.89.46:8081/api/currency',
  countryurl: 'http://3.139.89.46:8081/api/country/countries',
  stateurl: 'http://3.139.89.46:8081/api/country/states',
  expensetypeurl: 'http://3.139.89.46:8081/api/expense/expensetypes',
  expensecategoryurl: 'http://3.139.89.46:8081/api/expense/expensecategories',
  vendorbillsurl: 'http://3.139.89.46:8081/api/companyApi/vendorbills',
  vendorpaymenturl: 'http://3.139.89.46:8081/api/companyApi/vendorbills/payment',
  bankurl: 'http://3.139.89.46:8081/api/bank',
  paymenttermurl: 'http://3.139.89.46:8081/api/paymentterm'

  // url:"http://localhost:62585/api/",
  // conurl:"http://localhost:62585/api/Transactions/",
  // dashboardurl:"http://localhost:62585/api/dashboard/",
  // loginurl:"http://localhost:62585/api/Login/",
  // userurl:"http://localhost:62585/api/user/",
  // msgurl:"http://localhost:62585/api/sendmsg/",
  // maskurl:"http://localhost:62585/api/senderid/",

};


