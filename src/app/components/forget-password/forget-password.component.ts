import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private clientService:ClientService,
              private notificationService:NotificationService,
              private spinnerService: NgxSpinnerService
    ) { }
  email:string="";

  ngOnInit(): void {
  }

  requestNewPassword(){
    this.spinnerService.show(); 
    this.clientService.forgetPassword(this.email).subscribe(
      data=>{
        console.log(data);
        if(data.success==true){
          this.notificationService.showSuccess("A Reset Link Has been sent to your Email Address!");
          this.email="";
          
        }else{
          this.notificationService.showError("Failed to Send email. Enter Correct Email Address!");
           
        }
        this.spinnerService.hide(); 
      },
      err=>{
        console.log(err);
        this.spinnerService.hide(); 
      }
    )
  }

}
