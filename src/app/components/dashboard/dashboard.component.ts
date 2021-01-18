import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/common/client';
import { Register } from 'src/app/common/register';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { BillingService } from 'src/app/services/billing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
  clients:Client[]=[];
  currentId:string="";
  public indexCounter=0;
  searchText:string="";

  pageSize=2;  
  page = 1;
  currentPage=1;
  totalPageElement=0;
  
  registerUser=new Register();

  constructor(private clientService:ClientService,
              private billingService:BillingService,
              private spinnerService: NgxSpinnerService, 
              private notificationService:NotificationService,
              private modalService: NgbModal,
              private authService:AuthService,
              private route:Router) { }
  
  ngOnInit(): void {
    this.calcTotalClient();
    this.getClients(this.page);
  }
  calcTotalClient(){
    this.clientService.calcTotalClients().subscribe(
      data=>{
        this.totalPageElement=data.row;
        console.log(data);
      }

    );
  }
  getClients(tempPage:any){
    
    
    
    this.spinnerService.show(); 
   
    this.clientService.getClients(tempPage-1).subscribe(
      data=>{
        this.clients=data;
        this.currentPage=tempPage;
        this.spinnerService.hide();
      },
      ()=>{
          this.notificationService.showError("Failed to Load Data");
          this.spinnerService.hide();        
      }
    );
    
  }
  public routeToBillingPage(client:Client){
    
    this.billingService.setClientName(client.name!);
    this.billingService.setClientPhoneNumber(client.contactNumber!);
    this.billingService.setClientAddress(client.address!);
    this.billingService.setClientId(client.id!);

    this.route.navigateByUrl("billing-detail/"+client.id);
  }

  public update(client:Client, buttonParam:string){
    
    if(buttonParam=="1"){
      
      //Creating a new row 
      if(client.id=="0"){
        this.spinnerService.show();
        this.clientService.saveClient(client).subscribe(
          data=>{
            let obj = this.clients.find(c=>c.id=="0");
            obj!.id=data.id;
            this.spinnerService.hide();
            this.notificationService.showSuccess("Data Saved Successfully");
          },
          (err)=>{
            this.notificationService.showError("Failed to Save !!!");
          }
        )
      }
      else{
        this.spinnerService.show();
        this.clientService.updateClient(client).subscribe(
          data=>{
            console.log(data);  
            this.spinnerService.hide();
            this.notificationService.showSuccess("Data Updated Successfully")
          },
          (err)=>{
            this.notificationService.showError("Failed to Upate!!!");
          }
        );
      }
      this.currentId="-1";
      console.log(client);
    }else{
      this.currentId=client.id!;
      console.log(client);
    }
  }
  public addNewRow(){
    let newClient = new Client();
    newClient.id="0";
    this.currentId="0";
    this.clients.push(newClient);
  }

  public deleteClient(client:Client){

    if(confirm("Are you sure to delete this Client ? ")) {
      this.spinnerService.show();
      this.clientService.deleteClient(client.id).subscribe(
        data=>{
          const index = this.clients.indexOf(client, 0);
          this.clients.splice(index);
          this.spinnerService.hide();
          this.notificationService.showSuccess("Deleted Successfully.")
        },
        ()=>{
          this.notificationService.showError("Failed to Delete!!!");
        }
      );
    }
  }

  search(){
    console.log(this.searchText);
    if(this.searchText==""){
      this.page=1;
      this.calcTotalClient();
      this.getClients(this.page);
    }else{

      this.clientService.calcTotalSearchElements(this.searchText).subscribe(
        data=>{
          this.totalPageElement=data.row;
        }
      )
      this.spinnerService.show();
      this.clientService.searchClient(this.searchText,this.page-1).subscribe(
        
        data=>{
          this.clients=data;
          this.spinnerService.hide();
        },
        ()=>{
          this.notificationService.showError("Failed to Load Data");
          this.spinnerService.hide();        
        }
      );
    }

  }

  onChangePage() {
    if(this.searchText=="")
      this.getClients(this.page);
    else
      this.search();
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

}
