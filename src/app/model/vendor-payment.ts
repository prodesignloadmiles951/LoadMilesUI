export class VendorPayment {
    payments: [
        {
            billId: string;
            vendorId: string;
            paymentDate: string;
            amount: number;
            paymentMethod: string;
            paymentRef: string;
        }]
}