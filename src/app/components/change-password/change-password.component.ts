import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  password:any="";
  confirmPassword:any="";
  constructor(private clientService:ClientService,
              private spinnerService: NgxSpinnerService,
              private notificationService:NotificationService,
              private activatedRoute:ActivatedRoute,
              private router:Router
    ) { }

  token:string="";
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token')!;
  }

  changePassword(){
    console.log(this.password);
    this.spinnerService.show();
    if(this.password===this.confirmPassword){
        this.clientService.changePassword(this.token,this.password).subscribe(
          data=>{
            if(data.success==true){
              this.notificationService.showSuccess("Password Updated Successfully!")
              this.spinnerService.hide();
              this.router.navigate(['/login'])
            }else{
              this.notificationService.showError("Failed to update Password !");
              this.spinnerService.hide();
            }
          }
        )
    }else{
      this.notificationService.showError("Passwords are not matching!!!");
      this.spinnerService.hide();
    }
  }
}
