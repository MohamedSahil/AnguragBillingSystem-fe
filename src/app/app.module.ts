import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ClientService} from './services/client.service';
import {HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BillingComponent } from './components/billing/billing.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './components/payment/payment.component';



const routes : Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'billing-detail/:id',component:BillingComponent},
  {path:'payment-detail/:cId/:id',component:PaymentComponent},
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BillingComponent,
    PaymentComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
