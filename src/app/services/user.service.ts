import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../common/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ROOT_URL:String="http://anuragecom.us-east-1.elasticbeanstalk.com"


  updateProfileUrl=this.ROOT_URL+"/updateProfile"
  updatePasswordUrl=this.ROOT_URL+"/updatePassword"
  fetchUserDetailUrl=this.ROOT_URL+"/fetchUserDetails"

  constructor(private httpClient:HttpClient) { }

  updateProfile(user:Register): Observable<any>{
    return this.httpClient.post<any>(this.updateProfileUrl,user);
  }
  fetchUserDetails(): Observable<Register>{
    return this.httpClient.get<any>(this.fetchUserDetailUrl);
  }

  updatePassword(password:String): Observable<any>{
      return this.httpClient.post<any>(this.updatePasswordUrl+"?password="+password,"");
  }

}
