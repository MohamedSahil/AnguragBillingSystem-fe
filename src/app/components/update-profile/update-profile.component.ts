import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/common/register';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import {UserService} from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {

  registerUser=new Register();
  updateUser = new Register();
  constructor(private clientService:ClientService,
              private spinnerService: NgxSpinnerService, 
              private notificationService:NotificationService,
              private modalService: NgbModal,
              private authService:AuthService,
              private route:Router,
              private userService:UserService
              ) { }

  ngOnInit(): void {
    this.getDetails();
  }
  getDetails(){
    this.spinnerService.show();
    this.userService.fetchUserDetails().subscribe(
      data=>{
        this.updateUser=data;
        this.spinnerService.hide();
      },
      err=>{
        this.notificationService.showError("Failed to Fetch the Details!")
        this.spinnerService.hide();
      }
    )
  }

  changeProfileDetails(){
    this.spinnerService.show();
    this.userService.updateProfile(this.updateUser).subscribe(
      data=>{
        if(data.success==true){
          this.notificationService.showSuccess("Data Saved Successfully!");
          this.spinnerService.hide();
        }else{
          this.notificationService.showError("Failed to save the Data!");
          this.spinnerService.hide();
        }
        this.spinnerService.hide();
      },
      err=>{
        this.notificationService.showError("Failed to save the Data!");
        this.spinnerService.hide();
      }
    )
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
