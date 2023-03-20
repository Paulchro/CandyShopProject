import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(public router: Router) { }
  public isAdmin$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    sessionStorage.clear();
    this.isAdmin$.next(false);
    this.isAuthenticated$.next(false);  
    this.router.navigateByUrl('/signin');
  }
}
