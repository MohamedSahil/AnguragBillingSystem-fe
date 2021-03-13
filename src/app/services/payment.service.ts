import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Payment} from '../common/payment';
import { PaymentDto } from '../dto/payment-dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  ROOT_URL:String="http://anuragecom.us-east-1.elasticbeanstalk.com"


  private listPaymentUrl= this.ROOT_URL+"/listPaymentDetails/"
  private addPaymentUrl= this.ROOT_URL+"/addPaymentDetail"
  private updatePaymentUrl= this.ROOT_URL+"/updatePaymentDetail"
  private deletePaymentUrl= this.ROOT_URL+"/deletePayment/"
  
  private searchPaymentsUrl = this.ROOT_URL+"/searchPayments"
  private totalPaymentsUrl = this.ROOT_URL+"/totalPayments"
  private totalSearchPaymentsUrl = this.ROOT_URL+"/totalSearchPayments"


  constructor(private httpClient:HttpClient) { }
  getPaymentList(clientId:any,billingId:any,page:any){
    return this.httpClient.get<Payment[]>(this.listPaymentUrl+clientId+"/"+billingId+"?page="+page);
  }

  savePaymentDetail(paymentDetailDto:PaymentDto) {
    // need to build URL based on product id
    return this.httpClient.post<any>(this.addPaymentUrl,paymentDetailDto);
  }

  updatePaymentDetail(paymentDetailDto:Payment) {
    // need to build URL based on product id
    return this.httpClient.put<any>(this.updatePaymentUrl,paymentDetailDto);
  }

  searchPaymentDetail(query:any,bid:any,page:any){
    return this.httpClient.get<Payment[]>(this.searchPaymentsUrl+"/"+bid+"?query="+query+"&page="+page);
  }

  deletePaymentDetail(id:any){
    return this.httpClient.delete<any>(this.deletePaymentUrl+id);
  }
  
  calcTotalPayment(billingId:any){
    return this.httpClient.get<any>(this.totalPaymentsUrl+"/"+billingId);
  }

  calcTotalSearchPayment(query:any,bid:any){
    return this.httpClient.get<any>(this.totalSearchPaymentsUrl+"/"+bid+"?query="+query);
  }
}
