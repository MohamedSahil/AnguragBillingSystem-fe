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
import {NgxSpinnerModule } from 'ngx-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guard/auth-guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdateUserPasswordComponent } from './components/update-user-password/update-user-password.component';




const routes : Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'billing-detail/:id',component:BillingComponent,canActivate:[AuthGuard]},
  {path:'payment-detail/:cId/:id',component:PaymentComponent,canActivate:[AuthGuard]},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'reset',component:ChangePasswordComponent},
  {path:'updateProfile',component:UpdateProfileComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'**',redirectTo:'/products',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BillingComponent,
    PaymentComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    UpdateUserPasswordComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
 
  ],
  providers: [AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
