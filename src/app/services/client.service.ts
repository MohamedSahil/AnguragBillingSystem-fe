import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../common/client';
import { Register } from '../common/register';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  ROOT_URL:String="http://anuragecom.us-east-1.elasticbeanstalk.com"

  private baseUrl = this.ROOT_URL+'/listClients';
  private addClient=this.ROOT_URL+'/saveClient';
  private modifyClient=this.ROOT_URL+'/updateClient';
  private delClient=this.ROOT_URL+'/deleteClient/';

  findClient=this.ROOT_URL+"/getClient";
  searchClientUrl=this.ROOT_URL+"/searchClient";
  totalClientsUrl=this.ROOT_URL+"/totalClients"

  totalSearchClientUrl=this.ROOT_URL+"/totalSearchClients";
  registerUserUrl=this.ROOT_URL+"/addUser";

  forgetPasswordUrl="this.ROOT_URL+/forgot"
  //localhost:8080/forgot?email=mdsahil

  changePasswordUrl="this.ROOT_URL+/reset"



  constructor(private httpClient:HttpClient) { 
  }

  getClient(clientId:any){
    console.log(clientId);
    return this.httpClient.get<Client>(this.findClient+"/"+clientId);

  }

  getClients(page:any): Observable<Client[]> {
    // need to build URL based on product id
    return this.httpClient.get<any>(this.baseUrl+"?page="+page);
  }

  saveClient(client:Client): Observable<Client> {
    // need to build URL based on product id
    return this.httpClient.post<any>(this.addClient,client);
  }

  updateClient(client:Client):Observable<String>{
    return this.httpClient.put<any>(this.modifyClient,client);
  }

  deleteClient(id:any){
    return this.httpClient.delete<any>(this.delClient+id);
  }
  searchClient(param:any,page:any){
    console.log("param : "+param);
    return this.httpClient.get<any>(this.searchClientUrl+ "?q="+param+"&page="+page);
  }
  
  calcTotalClients(){
    return this.httpClient.get<any>(this.totalClientsUrl);
  }

  calcTotalSearchElements(param:any){
    return this.httpClient.get<any>(this.totalSearchClientUrl+"?q="+param);
  }

  
  registerUser(user:Register): Observable<Register>{
    return this.httpClient.post<Register>(this.registerUserUrl,user);
  }

  forgetPassword(email:any):Observable<any>{
    console.log("email:"+email);
    return this.httpClient.post<any>(this.forgetPasswordUrl+"?email="+email,"");
  }

  changePassword(token:any,password:any){
    console.log("Password : "+password);
    return this.httpClient.post<any>(this.changePasswordUrl+"?token="+token+"&password="+password,"");
  }

}

interface GetResponseClients {
  _embedded: {
    clients: Client[];
  }
}