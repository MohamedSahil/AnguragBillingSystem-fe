import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billing } from '../common/billing';
import {BillingDto} from '../dto/billing-dto'

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  ROOT_URL:String="http://anuragecom.us-east-1.elasticbeanstalk.com"

  listBillsUrl=this.ROOT_URL+"/listBillingDetail";
  saveBillUrl=this.ROOT_URL+"/updateBillingDetail";
  createBillUrl=this.ROOT_URL+"/addBillingDetail";
  searchBillUrl=this.ROOT_URL+"/searchBills"
  deleteBillUrl=this.ROOT_URL+"/deleteBill"
  totalBillsUrl=this.ROOT_URL+"/totalBills"
  totalSearchBillingIdUrl=this.ROOT_URL+"/totalSearchBills"
  
  
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
