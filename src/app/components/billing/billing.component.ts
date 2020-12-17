import { Component, OnInit } from '@angular/core';
import { IDayCalendarConfig } from 'ng2-date-picker';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {BillingService} from 'src/app/services/billing.service';
import { Billing } from 'src/app/common/billing';
import { BillingDto } from 'src/app/dto/billing-dto';
import { DatePipe } from '@angular/common';
import {ClientService} from 'src/app/services/client.service';
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

  ngOnInit(){

    this.name=this.billingService.getClientName();
    this.contactNumber=this.billingService.getClientPhoneNumber();
    this.address=this.billingService.getClientAddress();
    if(this.name==""){
      this.loadData();
    }
    this.showBillingList()
    this.showUpdatedMsg=true;
    
  }
  constructor(private route:ActivatedRoute,
              private billingService:BillingService,
              private clientService:ClientService,
              private router:Router) 
              {}

  loadData(){
    let tempId=this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(tempId).subscribe(
      data=>{
        this.name=data.name!;
        this.contactNumber=data.contactNumber!;
        this.address=data.address!;
      }
    );

  }

  public deleteBill(billingDetail:Billing){
    var tempBill=this.billingDetails;
    if(confirm("Are you sure to delete this bill ? ")) {
      this.billingDetails.slice
      console.log("Implement delete functionality here");
    }else{
      this.billingDetails=tempBill;
    }
  }

  public showBillingList(){
    let tempId=this.route.snapshot.paramMap.get('id');
    // get the "id" param string. convert string to a number using the "+" sys
    const billingId: number =  +tempId!;
    this.billingService.getBillingList(billingId).subscribe(
      (data)=>{
        this.billingDetails=data;
        console.log(this.billingDetails);
      }
      
    );
  }

  
  public test(billingDetail:Billing, buttonParam:string){
    this.flag=!this.flag;
    console.log(billingDetail);
    const billingDate:string = new DatePipe('en-US').transform(billingDetail.billingDate, 'MM-dd-yyyy')!

    if(buttonParam=="1"){
      this.currentId="";
      billingDetail.billingAmount=+billingDetail.billingAmount!;
      let billingDto:BillingDto = new BillingDto();

      
      billingDto.billingAmount=billingDetail.billingAmount;
      billingDto.billingDate=billingDate;

      console.log("DTO")
      console.log(billingDto);
      //Fow newly created row 
      if(billingDetail.billingId=="0"){
        let tempId=this.route.snapshot.paramMap.get('id');
        billingDto.clientId=tempId!;

        this.billingService.createBill(billingDto).subscribe(
          (data)=>{
            console.log(data);
            //window.location.reload();
          }
        );
      }else{
        billingDto.billingId=billingDetail.billingId;
        this.billingService.saveBillingList(billingDto).subscribe(
          data=>{console.log(data);this.showUpdatedMsg=true;}
        );
      }

    } else{
      this.showUpdatedMsg=false;
      this.currentId=billingDetail.billingId!;
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
    this.router.navigateByUrl("/payment-detail/"+billingDetail.billingId);
  }

  search(){
    console.log("Consolde")
    console.log(this.searchText);
  }

}
