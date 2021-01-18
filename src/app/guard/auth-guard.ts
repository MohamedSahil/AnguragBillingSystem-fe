import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{  
    constructor(private _authService:AuthService,
        private _router:Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean{
    if(this._authService.loggedIn()){
        return true;
    }else{
        this._router.navigate(['/login'])
        return false;
    }
}

}
