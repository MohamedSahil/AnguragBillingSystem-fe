import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/common/client';
import { ClientService } from 'src/app/services/client.service';
import { BillingService } from 'src/app/services/billing.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private clientService:ClientService,
              private billingService:BillingService,
              private route:Router) { }
  
  ngOnInit(): void {
    console.log("Ng On Init!")
    this.getClients();
  }
  getClients(){
    this.clientService.getClients().subscribe(
      data=>{
        this.clients=data;console.log(this.clients)
      }
    );
  }
  public routeToBillingPage(client:Client){
    console.log("hello")
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
        this.clientService.saveClient(client).subscribe(
          data=>{
            let obj = this.clients.find(c=>c.id=="0");
            obj!.id=data.id;
          }
        )
      }
      else{
        this.clientService.updateClient(client).subscribe(
          data=>{
            console.log(data);  
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
    this.clientService.deleteClient(client.id).subscribe(
      data=>{
        console.log(data)
        const index = this.clients.indexOf(client, 0);
        console.log(index);
        this.clients.splice(index);
        console.log(this.clients);
      }
    );
  }

  search(){
    console.log(this.searchText);
    
    this.clientService.searchClient(this.searchText).subscribe(
      data=>this.clients=data
    )

  }

}
