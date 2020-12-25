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
  deleteBillUrl="http://localhost:8080/deleteBill"
  totalBillsUrl="http://localhost:8080/totalBills"
  totalSearchBillingIdUrl="http://localhost:8080/totalSearchBills"
  
  
  private clientName=""
  private clientPhoneNumber=""
  private clientAddress=""
  private clientId=""

  constructor(private httpClient:HttpClient) { }

  

  getBillingList(id:number,page:any){
    return this.httpClient.get<Billing[]>(this.listBillsUrl+"/"+id+"?page="+page);
  }

  createBill(billingDto:BillingDto){
    return this.httpClient.post<Billing>(this.createBillUrl,billingDto);
  }
  saveBillingList(billingDto:BillingDto){
    return this.httpClient.post<Billing>(this.saveBillUrl,billingDto);
  }
  searchBills(clientId:any,query:any,page:any){
    return this.httpClient.get<Billing[]>(this.searchBillUrl+"/"+clientId+"?query="+query+"&page="+page);
  }
  deleteBill(id:any){
    return this.httpClient.delete<any>(this.deleteBillUrl+"/"+id);
  }
  calcTotalBill(clientId:any){
    return this.httpClient.get<any>(this.totalBillsUrl+"/"+clientId);
  }

  calcTotalSearchElements(clientId:any,param:any){
    return this.httpClient.get<any>(this.totalSearchBillingIdUrl+"/"+clientId+"?query="+param);
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
