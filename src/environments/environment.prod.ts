// export const environment = {
//   production: true,
//   Login_User:"LOGIN_USER",
//   url:"http://3.139.89.46:8081/api/",
//   loginurl:"http://3.139.89.46:8081/adminapi/login",
//   companyurl:"http://3.139.89.46:8081/companyapi/company",
// };


const currentEnv = 'http://ec2-3-139-89-46.us-east-2.compute.amazonaws.com'; //dev Env

export const environment = {
  production: true,
  Login_User: 'LOGIN_USER',
  dashboardurl: 'http://localhost:4200/api/dashboard/',
  url: 'http://3.139.89.46:8081/',
  loginurl: 'http://ec2-3-139-89-46.us-east-2.compute.amazonaws.com:5000/api/user/login',
  // loginurl: 'http://3.139.89.46:8081/userapi/login',
  companyurl: 'http://3.139.89.46:8081/companyapi/company',
  trucksurl: 'http://3.139.89.46:8081/trucksapi/trucks',
  trailersurl: 'http://3.139.89.46:8081/trailersapi/trailers',
  driversurl: 'http://3.139.89.46:8081/driversapi/drivers',
  carrierurl: 'http://3.139.89.46:8081/carriersapi/carriers',
  customersurl: 'http://3.139.89.46:8081/customersapi/customers',
  dispatchersurl: 'http://3.139.89.46:8081/dispatchersapi/dispatchers',
  getloadsurl: 'http://3.139.89.46:8081/loadsapi/loads',
  pickupform: 'http://3.139.89.46:8081/pickupapi/pickup',
  dropoffform: 'http://3.139.89.46:8081/dropoffapi/dropoff',
  // uploadUrl:'http://ec2-54-166-101-176.compute-1.amazonaws.com:8081/fileapi/file'
  uploadUrl: 'http://3.139.89.46:8081/fileapi/file',
  postalcodeUrl: 'http://3.139.89.46:8081/fileapi/postal_code?postal_code=',
  roledetailsUrl: 'http://3.139.89.46:8081/roleapi/role',
  newcompanyurl: currentEnv + ':5000/api/company',
  newcompanycreateurl: 'http://3.139.89.46:8081/companyapi/company/',
  userdetailsurl: 'http://3.139.89.46:8081/userapi/user',
  vendorurl: 'http://localhost:5000/api/companyApi/vendor',
  fuelCardurl: 'http://54.166.101.176:8081/fuelCardapi/fuelCard',
  factorurl: 'http://54.166.101.176:8081/factorapi/factor',
  currencyurl: 'http://localhost:5000/api/currency',
  countryurl: 'http://localhost:5000/api/country/countries',
  stateurl: 'http://localhost:5000/api/country/states',
  expensetypeurl: 'http://localhost:5000/api/expense/expensetypes',
  expensecategoryurl: 'http://localhost:5000/api/expense/expensecategories',
  vendorbillsurl: 'http://localhost:5000/api/companyApi/vendorbills',
  vendorpaymenturl: 'http://localhost:5000/api/companyApi/vendorbills/payment',
  bankurl: 'http://localhost:5000/api/bank',
  paymenttermurl: 'http://localhost:5000/api/paymentterm'
}
