import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billing } from '../common/billing';
import {BillingDto} from '../dto/billing-dto'

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  listBillsUrl="http://localhost:8080/listBillingDetail";
  saveBillUrl="http://localhost:8080/updateBillingDetail";
  createBillUrl="http://localhost:8080/addBillingDetail";
  searchBillUrl="http://localhost:8080/searchBills"
  
  
  
  private clientName=""
  private clientPhoneNumber=""
  private clientAddress=""
  private clientId=""

  constructor(private httpClient:HttpClient) { }

  

  getBillingList(id:number){
    return this.httpClient.get<Billing[]>(this.listBillsUrl+"/"+id);
  }

  createBill(billingDto:BillingDto){
    return this.httpClient.post<Billing>(this.createBillUrl,billingDto);
  }
  saveBillingList(billingDto:BillingDto){
    return this.httpClient.post<Billing>(this.saveBillUrl,billingDto);
  }
  searchBills(query:any){
    return this.httpClient.get<Billing[]>(this.searchBillUrl+"?query="+query);
  }


  setClientName(name:string){
    this.clientName=name;
  }
  getClientName():string{
    return this.clientName;
  }

  setClientPhoneNumber(number:string){
    this.clientPhoneNumber=number;
  }
  getClientPhoneNumber(){
    return this.clientPhoneNumber;
  }

  setClientAddress(address:string){
    this.clientAddress=address;
  }
  getClientAddress(){
    return this.clientAddress;
  }
  setClientId(id:string){
    this.clientId=id;
  }
  getClientId(){
    return this.clientId;
  }


}
