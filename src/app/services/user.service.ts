import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../common/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  updateProfileUrl="http://localhost:8080/updateProfile"
  fetchUserDetailUrl="http://localhost:8080/fetchUserDetails"

  constructor(private httpClient:HttpClient) { }

  updateProfile(user:Register): Observable<any>{
    return this.httpClient.post<any>(this.updateProfileUrl,user);
  }
  fetchUserDetails(): Observable<Register>{
    return this.httpClient.get<any>(this.fetchUserDetailUrl);
  }
}
