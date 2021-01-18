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

  private baseUrl = 'http://localhost:8080/listClients';
  private addClient='http://localhost:8080/saveClient';
  private modifyClient='http://localhost:8080/updateClient';
  private delClient='http://localhost:8080/deleteClient/'

  findClient="http://localhost:8080/getClient";
  searchClientUrl="http://localhost:8080/searchClient";
  totalClientsUrl="http://localhost:8080/totalClients"

  totalSearchClientUrl="http://localhost:8080/totalSearchClients";
  registerUserUrl="http://localhost:8080/addUser";

  forgetPasswordUrl="http://localhost:8080/forgot"
  //localhost:8080/forgot?email=mdsahil

  changePasswordUrl="http://localhost:8080/reset"



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