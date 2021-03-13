import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROOT_URL:String="http://anuragecom.us-east-1.elasticbeanstalk.com"

  private _loginUrl=this.ROOT_URL+"/authenticate";
  constructor(private http:HttpClient) { }
 
  loginUser(user:any) {
    return this.http.post<any>(this._loginUrl, user)
  }


  loggedIn(){
    return !!localStorage.getItem('authKey');
  }

  getToken() {
    return localStorage.getItem('authKey')
  }
  logout(){
    localStorage.removeItem('authKey');
  }
}
