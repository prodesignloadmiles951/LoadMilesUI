export class VendorFilters {
    companyId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    displayName: string;
    dateofbirth: any;
    ssn: any;
    currency: any;
    employmenttype: any;
    vendorgroup: any;
    paymentterm: any;
    vendoridaccount: any;
    phone: number;
    email: any;
    address1: string;
    address2: string;
    country: string;
    city: string;
    state: string;
    zipcode: any;
    quickpayid: any;
    account: Account;
}

export class Person {
    firstName: string;
    middleName: string;
    lastName: string;
    displayName: string;
}

export class Account {
    bankName: any;
    accountname: any;
    accounttype: any;
    accountnumber: any;
    routingnumber: any;
}
