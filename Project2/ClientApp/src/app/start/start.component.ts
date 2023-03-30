import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public authGuardService: AuthGuardService){}

  ngOnInit() {
    var connectedUser = sessionStorage.getItem('connectedUser');
    this.isAuthenticated$ = this.authGuardService.canActivate(connectedUser);
  }
  
}
