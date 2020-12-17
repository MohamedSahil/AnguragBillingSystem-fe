import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../common/client';

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


  constructor(private httpClient:HttpClient) { 
  }

  getClient(clientId:any){
    console.log(clientId);
    return this.httpClient.get<Client>(this.findClient+"/"+clientId);

  }

  getClients(): Observable<Client[]> {
    // need to build URL based on product id
    return this.httpClient.get<any>(this.baseUrl);
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
  searchClient(param:any){
    return this.httpClient.get<any>(this.searchClientUrl+ '?q='+param);
  }


}

interface GetResponseClients {
  _embedded: {
    clients: Client[];
  }
}