// export const environment = {
//   production: true,
//   Login_User:"LOGIN_USER",
//   url:"http://3.139.89.46:8081/api/",
//   loginurl:"http://3.139.89.46:8081/adminapi/login",
//   companyurl:"http://3.139.89.46:8081/companyapi/company",
// };


const currentEnv = 'http://ec2-18-188-27-134.us-east-2.compute.amazonaws.com:5000/api'; //dev Env

export const environment = {
  production: true,
  Login_User: 'LOGIN_USER',
  dashboardurl: 'http://localhost:4200/api/dashboard/',
  URL: currentEnv,
  url: 'http://3.139.89.46:8081/',
  loginurl: currentEnv + '/user/login',
  companyurl: currentEnv + '/company',
  trucksurl: currentEnv + '/companyApi/truck',
  trailersurl: currentEnv + '/companyApi/trailer',
  driversurl: currentEnv + '/companyApi/driver',
  dispatchersurl: currentEnv + '/companyApi/dispatcher',
  carrierurl: 'http://3.139.89.46:8081/carriersapi/carriers',
  customersurl: currentEnv + '/companyApi/customer',
  getloadsurl: currentEnv + '/companyApi/load',
  pickupform: currentEnv + '/companyApi/pickup',
  dropoffform: currentEnv + '/companyApi/dropoff',
  // uploadUrl:'http://ec2-54-166-101-176.compute-1.amazonaws.com:8081/fileapi/file'
  uploadUrl: 'http://3.139.89.46:8081/fileapi/file',
  postalcodeUrl: 'http://3.139.89.46:8081/fileapi/postal_code?postal_code=',
  roledetailsUrl:  currentEnv + '/role',
  newcompanyurl: currentEnv + '/company',
  newcompanycreateurl: currentEnv + '/company',
  userdetailsurl:  currentEnv + '/user',
  vendorurl: currentEnv + '/companyApi/vendor',
  fuelCardurl: 'http://3.139.89.46.176:8081/fuelCardapi/fuelCard',
  factorurl: 'http://3.139.89.46:8081/factorapi/factor',
  currencyurl: currentEnv + '/currency',
  countryurl: currentEnv + '/country/countries',
  stateurl: currentEnv + '/country/states',
  expensetypeurl: currentEnv + '/expense/expensetypes',
  expensecategoryurl: currentEnv + '/expense/expensecategories',
  vendorbillsurl: currentEnv + '/companyApi/vendorbills',
  vendorpaymenturl: currentEnv + '/companyApi/vendorbills/payment',
  bankurl: currentEnv + '/bank',
  paymenttermurl: currentEnv + '/paymentterm',
  forgotpasswordurl: currentEnv + '/user/forgotPassword',
  validateupdatepasswordurl: currentEnv + '/user/validateAndUpdatePassword'
}
