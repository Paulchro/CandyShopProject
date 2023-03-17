import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  canActivate(connectedUser: any): BehaviorSubject<boolean> {
    if (connectedUser != null && connectedUser != undefined){
      if (!this.auth.isAuthenticated(connectedUser)) { 
        this.router.navigate(['/signin']);
        this.isAuthenticated$.next(false);
      }else{
        this.router.navigate(['/home']);
        this.isAuthenticated$.next(true); 
      }
    }else{
      this.router.navigate(['/signin']);
      this.isAuthenticated$.next(false);
    }
    return this.isAuthenticated$;
  }
}
