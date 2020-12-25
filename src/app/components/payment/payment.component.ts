import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/common/payment';
import { BillingService } from 'src/app/services/billing.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ClientService } from 'src/app/services/client.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private spinnerService: NgxSpinnerService, 
              private router:Router
              ) { }

  paymentDetails:Payment[]=[];
  currentId:string="";
  name:string="";
  contactNumber:string="";
  address:string="";
  
  paymentOption=["NEFT","Cheque","Cash","Online"]
  searchText:string="";


  pageSize=2;  
  page = 1;
  currentPage=1;
  totalPageElement=0;

  clientId:any=null;
  billingId:any=null;

  ngOnInit(): void {
    
    this.clientId=this.route.snapshot.paramMap.get('cId');
    this.name=this.billingService.getClientName();
    this.contactNumber=this.billingService.getClientPhoneNumber();
    this.address=this.billingService.getClientAddress();
    
    if(this.name==""){
      this.loadData();
    }
    this.billingId=this.route.snapshot.paramMap.get('id');
    this.calcTotalPayment();
    this.loadPaymentDetail(this.clientId,this.billingId,this.page);
  }

  calcTotalPayment(){
    this.paymentService.calcTotalPayment(this.billingId).subscribe(
      data=>{
        console.log(data.row);
        this.totalPageElement=data.row;
        console.log("total element : " + this.totalPageElement);
      }
    )
  }
  loadData(){
    this.spinnerService.show();
    this.clientService.getClient(this.clientId).subscribe(
      data=>{
        this.name=data.name!;
        this.contactNumber=data.contactNumber!;
        this.address=data.address!;
        this.spinnerService.hide();
      }
    );
  }

  loadPaymentDetail(clientId:any,billingId:any,page:any){
    this.spinnerService.show();
    this.paymentService.getPaymentList(clientId,billingId,this.page-1).subscribe(
      data=>{
        this.paymentDetails=data
     
        this.currentPage=this.page;
        this.spinnerService.hide();
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

        this.spinnerService.show();
        this.paymentService.savePaymentDetail(paymentDetail).subscribe(
          data=>{
            let obj = this.paymentDetails.find(c=>c.paymentDetailId=="0");
            console.log(obj);
            obj!.paymentDetailId=data.paymentDetailId;
            this.spinnerService.hide();
          }
        )
        this.currentId="-1";
      }else{
      //Updating  a payment
        console.log(paymentDetail);
        paymentDetail.paymentDate=payDate;
        this.spinnerService.show();
        this.paymentService.updatePaymentDetail(paymentDetail).subscribe(
          (data)=>{
            console.log(data)
            this.spinnerService.hide();
          }
        );
        this.currentId="-1";

      }
    }
  }
  deletePaymentDetail(paymentDetail:Payment){
    if(confirm("Are you sure to delete this bill ? ")) {
      this.spinnerService.show();
      this.paymentService.deletePaymentDetail(paymentDetail.paymentDetailId).subscribe(
        data=>{
          const index = this.paymentDetails.indexOf(paymentDetail, 0);
          this.paymentDetails.splice(index);
          console.log(this.paymentDetails);
          this.spinnerService.hide();
        }
      )
    }
  }

  search(){
    if(this.searchText==""){
      this.calcTotalPayment();
      this.loadPaymentDetail(this.clientId,this.billingId,this.page);
    }
    else{
      this.spinnerService.show();
      this.paymentService.calcTotalSearchPayment(this.searchText,this.billingId).subscribe(
        data=>{
          this.totalPageElement=data.row
        }
      );
      this.paymentService.searchPaymentDetail(this.searchText,this.billingId,this.page-1).subscribe(
        data=>{
          this.paymentDetails=data;
          this.spinnerService.hide();
        }
      );
    }
  }
  onChangePage() {
    if(this.searchText=="")
      this.loadPaymentDetail(this.clientId,this.billingId,this.page-1);
    else
      this.search();  
  }
}
