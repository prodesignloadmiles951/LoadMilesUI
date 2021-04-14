// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// const currentEnv = 'http://localhost'; //local
const currentEnv = 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api'; //dev Env

export const environment = {
  production: false,
  Login_User: 'LOGIN_USER',
  dashboardurl: 'http://localhost:4200/api/dashboard/',
  URL: currentEnv,
  url: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/',
  loginurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/user/login',
  companyurl: currentEnv + '/company',
  trucksurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/truck',
  trailersurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/trailer',
  driversurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/driver',
  dispatchersurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/dispatcher',
  carrierurl: 'http://3.139.89.46:8081/carriersapi/carriers',
  customersurl: currentEnv + '/companyApi/customer',
  getloadsurl: currentEnv + '/companyApi/load',
  pickupform: currentEnv + '/companyApi/pickup',
  dropoffform: currentEnv + '/companyApi/dropoff',
  // uploadUrl:'http://ec2-54-166-101-176.compute-1.amazonaws.com:8081/fileapi/file'
  uploadUrl:'http://3.139.89.46:8081/fileapi/file',
  postalcodeUrl:'http://3.139.89.46:8081/fileapi/postal_code?postal_code=',
  roledetailsUrl: 'http://3.139.89.46:8081/roleapi/role',
  newcompanyurl: currentEnv + '/company',
  newcompanycreateurl: currentEnv + '/company/',
  userdetailsurl: 'http://3.139.89.46:8081/userapi/user',
  vendorurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/vendor',
  fuelCardurl: 'http://3.139.89.46.176:8081/fuelCardapi/fuelCard',
  factorurl: 'http://3.139.89.46:8081/factorapi/factor',
  currencyurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/currency',
  countryurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/country/countries',
  stateurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/country/states',
  expensetypeurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/expense/expensetypes',
  expensecategoryurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/expense/expensecategories',
  vendorbillsurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/vendorbills',
  vendorpaymenturl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/companyApi/vendorbills/payment',
  bankurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/bank',
  paymenttermurl: 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api/paymentterm'

  // url:"http://localhost:62585/api/",
  // conurl:"http://localhost:62585/api/Transactions/",
  // dashboardurl:"http://localhost:62585/api/dashboard/",
  // loginurl:"http://localhost:62585/api/Login/",
  // userurl:"http://localhost:62585/api/user/",
  // msgurl:"http://localhost:62585/api/sendmsg/",
  // maskurl:"http://localhost:62585/api/senderid/",

};


