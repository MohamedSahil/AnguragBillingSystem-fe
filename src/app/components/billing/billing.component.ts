import { Component, OnInit } from '@angular/core';
import { IDayCalendarConfig } from 'ng2-date-picker';
import {NgbDateStruct, NgbCalendar, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {BillingService} from 'src/app/services/billing.service';
import { Billing } from 'src/app/common/billing';
import { BillingDto } from 'src/app/dto/billing-dto';
import { DatePipe } from '@angular/common';
import {ClientService} from 'src/app/services/client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/common/register';
//import {DatepickerOptions,DateModel} from 'ng2-datepicker';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  flag:boolean=false;
  currentId:string="";
  showUpdatedMsg:boolean=false;

  public billingDetails : Billing[] = [];
  
  name:string="";
  contactNumber:string="";
  address:string="";
  searchText:string="";
  clientId:any=null;

  pageSize=10;  
  page = 1;
  currentPage=1;
  totalPageElement=0;

  registerUser=new Register();

  ngOnInit(){

    this.name=this.billingService.getClientName();
    this.contactNumber=this.billingService.getClientPhoneNumber();
    this.address=this.billingService.getClientAddress();
    this.clientId=this.route.snapshot.paramMap.get('id');
    if(this.name==""){
      this.loadData();
    }

    this.calcTotalBills();
    this.showBillingList()

    this.showUpdatedMsg=true;
    
  }
  constructor(private route:ActivatedRoute,
              private billingService:BillingService,
              private clientService:ClientService,
              private spinnerService: NgxSpinnerService,  
              private notificationService:NotificationService,
              private modalService: NgbModal,
              private authService:AuthService,
              private router:Router) 
              {}

  loadData(){
    this.spinnerService.show();
    this.clientService.getClient(this.clientId).subscribe(
      data=>{
        this.name=data.name!;
        this.contactNumber=data.contactNumber!;
        this.address=data.address!;
        this.spinnerService.hide();
      },()=>{
        this.spinnerService.hide();
      }
    );

  }

  public deleteBill(billingDetail:Billing){
    var tempBill=this.billingDetails;
    if(confirm("Are you sure to delete this bill ? ")) {
      
      this.spinnerService.show();
      this.billingService.deleteBill(billingDetail.billingId).subscribe(
        () => {
          const index = this.billingDetails.indexOf(billingDetail);
          this.billingDetails.splice(index,1);
          this.spinnerService.hide();
          this.notificationService.showSuccess("Deleted Successfully.")
        },
        (err)=>{
          this.notificationService.showError("Failed to Delete!!!");
          this.spinnerService.hide();

          
        }
      );
    }else{
      this.billingDetails=tempBill;
    }
  }

  calcTotalBills(){
    this.billingService.calcTotalBill(this.clientId).subscribe(
      data=>this.totalPageElement=data.row
    );
  }

  public showBillingList(){
    let tempId=this.route.snapshot.paramMap.get('id');
    // get the "id" param string. convert string to a number using the "+" sys
    const billingId: number =  +tempId!;
    this.spinnerService.show();
    this.billingService.getBillingList(billingId,this.page-1).subscribe(
      (data)=>{
        this.billingDetails=data;
        //console.log(this.billingDetails);
        this.spinnerService.hide(); 
      },err=>{
        this.spinnerService.hide();
      }  
    );
  }

  
  public test(billingDetail:Billing, buttonParam:string){
    this.flag=!this.flag;

    const billingDate:string = new DatePipe('en-US').transform(billingDetail.billingDate, 'MM-dd-yyyy')!

    if(buttonParam=="1"){
      this.currentId="";
      billingDetail.billingAmount=+billingDetail.billingAmount!;
      let billingDto:BillingDto = new BillingDto();
  
      billingDto.billingAmount=billingDetail.billingAmount;
      billingDto.billingDate=billingDate;
      //Fow newly created row 
      if(billingDetail.billingId=="0"){
        let tempId=this.route.snapshot.paramMap.get('id');
        billingDto.clientId=tempId!;

        this.spinnerService.show();
        this.billingService.createBill(billingDto).subscribe(
          (data)=>{
            let obj = this.billingDetails.find(c=>c.billingId=="0");
            obj!.billingId=data.billingId;
            //window.location.reload();
            this.spinnerService.hide();
            this.notificationService.showSuccess("Data Saved Successfully");
          },
          (err)=>{
            this.notificationService.showError("Failed to Save !!!");
            this.spinnerService.hide();
          }
        );
      }else{
        billingDto.billingId=billingDetail.billingId;
        this.spinnerService.show();
        this.billingService.saveBillingList(billingDto).subscribe(
          data=>{
            console.log(data);
            this.spinnerService.hide();
            this.notificationService.showSuccess("Data Updated Successfully")
          },
          (err)=>{
            this.notificationService.showError("Failed to Upate!!!");
            this.spinnerService.hide();
          }
        );
      }

    } else{
      this.showUpdatedMsg=false;
      this.currentId=billingDetail.billingId!;
      this.spinnerService.hide();
    }

    console.log(billingDetail);
  }

  public addNewRow(){
    let newBill = new Billing();
    newBill.billingId="0";
    this.currentId="0";
    let clientName=this.billingService.getClientName();
   
    newBill.paidAmount=0;
    this.billingDetails.push(newBill);
    console.log(newBill);
  }
  
  public routeToPaymentPage(billingDetail:any){
    let clientId=this.route.snapshot.paramMap.get('id');
    this.billingService.setClientId(clientId!);
    console.log(this.clientId);
    let link = "/payment-detail/"+ this.clientId +"/" +billingDetail.billingId;
    this.router.navigateByUrl(link);
  }

  search(){
    console.log("Consolde")
    if(this.searchText==""){
      this.calcTotalBills();
      this.showBillingList();
    }
    else{
      this.spinnerService.show();
      this.billingService.calcTotalSearchElements(this.clientId,this.searchText).subscribe(
        data=>{
          this.totalPageElement=data.row
          this.spinnerService.hide();
        },
        err=>{
          this.spinnerService.hide();

        }
      )

      this.billingService.searchBills(this.clientId,this.searchText,this.page-1).subscribe(
        data=>{
          this.billingDetails=data
          this.spinnerService.hide();
        },err=>{
          this.spinnerService.hide();
        }
      );
    }
  }

  onChangePage() {
    if(this.searchText=="")
      this.showBillingList();
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
  this.router.navigate(['/login'])
  }
}
