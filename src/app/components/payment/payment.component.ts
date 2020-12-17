import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/common/payment';
import { BillingService } from 'src/app/services/billing.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ClientService } from 'src/app/services/client.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  constructor(private billingService:BillingService,
              private paymentService:PaymentService,
              private clientService:ClientService,
              private route:ActivatedRoute,
              private router:Router
              ) { }

  paymentDetails:Payment[]=[];
  currentId:string="";
  name:string="";
  contactNumber:string="";
  address:string="";
  clientId:string=""
  paymentOption=["NEFT","Cheque","Cash","Online"]
  searchText:string="";

  ngOnInit(): void {
    this.clientId = this.billingService.getClientId();
    this.name=this.billingService.getClientName();
    this.contactNumber=this.billingService.getClientPhoneNumber();
    this.address=this.billingService.getClientAddress();
    
  
    if(this.clientId==""){
      this.router.navigateByUrl("/dashboard");
    }else{
      if(this.name==""){
        this.loadData();
      }
      let billingId=this.route.snapshot.paramMap.get('id');
      this.loadPaymentDetail(this.clientId,billingId);
    }
  }

  loadData(){
    this.clientService.getClient(this.clientId).subscribe(
      data=>{
        this.name=data.name!;
        this.contactNumber=data.contactNumber!;
        this.address=data.address!;
      }
    );
  }

  loadPaymentDetail(clientId:any,billingId:any){
    this.paymentService.getPaymentList(clientId,billingId).subscribe(
      data=>{
        this.paymentDetails=data
        console.log(data)
      }
    );
  }
  public addNewRow(){
    let newPayment = new Payment();
    newPayment.paymentDetailId="0";
    this.currentId="0";
    this.paymentDetails.push(newPayment);
  }
  modify(paymentDetail:Payment,buttonParam:string){
    if(buttonParam=="0"){
      this.currentId=paymentDetail.paymentDetailId!;
    }else if (buttonParam=="1"){
      
      const payDate:string = new DatePipe('en-US').transform(paymentDetail.paymentDate, 'MM-dd-yyyy')!
      
      if(this.currentId=="0"){
        //Create the new PaymentDetail 

        let billingId=this.route.snapshot.paramMap.get('id');
        
        paymentDetail.billingId=billingId!;
        paymentDetail.clientId=this.clientId;
        paymentDetail.paymentDate=payDate;

        this.paymentService.savePaymentDetail(paymentDetail).subscribe(
          data=>console.log(data)
        )
        this.currentId="-1";
      }else{
      //Updating  a payment
        console.log(paymentDetail);
        paymentDetail.paymentDate=payDate;
        this.paymentService.updatePaymentDetail(paymentDetail).subscribe(
          (data)=>{console.log(data)}
        );
        this.currentId="-1";

      }
    }
  }
  deleteBill(paymentDetail:Payment){

  }

  search(){
    console.log("Consolde")
    console.log(this.searchText);
  }

}
