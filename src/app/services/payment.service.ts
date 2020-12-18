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
  private searchPaymentsUrl = "http://localhost:8080/searchPayments"

  constructor(private httpClient:HttpClient) { }
  getPaymentList(clientId:any,billingId:any){
    return this.httpClient.get<Payment[]>(this.listPaymentUrl+clientId+"/"+billingId);
  }

  savePaymentDetail(paymentDetailDto:PaymentDto) {
    // need to build URL based on product id
    return this.httpClient.post<any>(this.addPaymentUrl,paymentDetailDto);
  }

  updatePaymentDetail(paymentDetailDto:Payment) {
    // need to build URL based on product id
    return this.httpClient.put<any>(this.updatePaymentUrl,paymentDetailDto);
  }

  searchPaymentDetail(query:any){
    return this.httpClient.get<Payment[]>(this.searchPaymentsUrl+"?query="+query);
  }

}
