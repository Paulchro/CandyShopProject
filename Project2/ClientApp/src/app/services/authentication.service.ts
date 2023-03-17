import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAdmin$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public router: Router) { }
  
  isAuthenticated(connectedUser: any){
    if (connectedUser != null && connectedUser != undefined){
      var connectedUserObj = JSON.parse(connectedUser);
      if (connectedUserObj !== null && connectedUserObj != undefined){
        if (connectedUserObj['username'] != null && connectedUserObj['username'] != undefined &&  connectedUserObj['username'] != '' && connectedUserObj['password'] != null && connectedUserObj['password'] != undefined && connectedUserObj['password'] != ''){
          this.isAuthenticated$.next(true);
        }else{
          this.isAuthenticated$.next(false);
        }
      } 
    } 
    return this.isAuthenticated$;
  }

  checkIsAdmin(connectedUser: any){
    if (connectedUser != null && connectedUser != undefined){
      var connectedUserObg = JSON.parse(connectedUser);
      if (connectedUserObg !== null && connectedUserObg != undefined){
        if (connectedUserObg['username'] == 'admin'){
          this.isAdmin$.next(true);
        }else{
          this.isAdmin$.next(false);
        }  
      }
    }  
    return this.isAdmin$; 
  }

  authenticatedUser(form:any){
    sessionStorage.setItem('connectedUser', JSON.stringify(form));
  }
}