export class PaymentDto {
    
    paymentDetailId: string | undefined;
    
    clientId:string |undefined;
    paymentDate:string | undefined;
    paidAmount:number | undefined;
    customBillingId:string | undefined;
    wayOfPayment: string | undefined; 
    paymentInfo:string | undefined;
}
