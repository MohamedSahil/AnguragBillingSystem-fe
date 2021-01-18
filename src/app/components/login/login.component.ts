import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  
  user={"username":"","password":""};
  constructor(private _authService:AuthService,
              private notificationService:NotificationService,
              private spinnerService: NgxSpinnerService,
              private _router:Router) { }

  ngOnInit(): void {
    this.loggedIn();
  }

  public loggedIn(){
    if(this._authService.loggedIn()){
        this._router.navigate(['/dashboard']);
    }
  }
  loginUser(){
    this.spinnerService.show(); 
    this._authService.loginUser(this.user).subscribe(
      (res)=>{ 
        localStorage.setItem('authKey', res.token)
        this._router.navigate(['/'])
        this.spinnerService.hide(); 
        //window.location.reload();
      },
      (err)=>{
        console.log(err);
        this.notificationService.showError("Login Failed!!")
        this.spinnerService.hide(); 
      }
    );
  }
  

}
