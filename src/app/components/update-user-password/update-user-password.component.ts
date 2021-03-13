import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Register } from 'src/app/common/register';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css']
})
export class UpdateUserPasswordComponent implements OnInit {


  password = "";
  confirmPassword="";

  //This is for the modal . Create user component
  registerUser=new Register();
  constructor(private clientService:ClientService,
    private spinnerService: NgxSpinnerService, 
    private notificationService:NotificationService,
    private authService:AuthService,
    private route:Router,
    private userService:UserService,
    private modalService: NgbModal
    ) { }


  ngOnInit(): void {
  }

  changePassword(){
    if(this.password===this.confirmPassword){
      this.spinnerService.show();
      this.userService.updatePassword(this.password).subscribe(
        data=> {
          if(data.success==true){
            this.notificationService.showSuccess("Password Changed Successfully!");
            this.spinnerService.hide();
          }else{
            this.notificationService.showError("Failed to save the Password!");
            this.spinnerService.hide();
          }
          this.spinnerService.hide();
        },
        err=>{
          this.notificationService.showError("Failed to save the Password!");
          this.spinnerService.hide();
        }
      );
    }else{
      this.notificationService.showError("Passwords are not matching. Try one more time!")
    }
  }

  openScrollableContent(longContent:any) {
    this.modalService.open(longContent, { scrollable: true, size: 'lg' });
  }

  register(longContent:any){
    this.spinnerService.show();
      this.clientService.registerUser(this.registerUser).subscribe(
        data=>{
          console.log(data);
          this.spinnerService.hide();
          this.notificationService.showSuccess("Registered User Successfully.")
          this.modalService.dismissAll(longContent);
        },
        ()=>{
          this.notificationService.showError("Failed to register");
          this.spinnerService.hide();
          this.modalService.dismissAll(longContent);
        }
      )
  }


  logout(){
    
    this.authService.logout();
    this.notificationService.showSuccess("Logged Out Successfully ")
   this.route.navigate(['/login'])
   }
   homePage(){
     this.route.navigate(['/dashboard'])
   }

}
