import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Payment} from '../common/payment';
import { PaymentDto } from '../dto/payment-dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private listPaymentUrl= "http://localhost:8080/listPaymentDetails/"
  private addPaymentUrl= "http://localhost:8080/addPaymentDetail"
  private updatePaymentUrl= "http://localhost:8080/updatePaymentDetail"
  private deletePaymentUrl= "http://localhost:8080/deletePayment/"
  
  private searchPaymentsUrl = "http://localhost:8080/searchPayments"
  private totalPaymentsUrl = "http://localhost:8080/totalPayments"
  private totalSearchPaymentsUrl = "http://localhost:8080/totalSearchPayments"


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
