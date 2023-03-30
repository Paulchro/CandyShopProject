import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public authGuardService: AuthGuardService,
    public authService: AuthService,
    public router: Router){
  }
  
  ngOnInit() {
    var connectedUser = sessionStorage.getItem('connectedUser');
    this.isAuthenticated$ = this.authGuardService.canActivate(connectedUser);
    this.signInForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit() {
    this.router.navigate(['/home']);
    this.isAuthenticated$.next(true);
    this.authService.authenticatedUser(this.signInForm.value);
  }

  getErrorMessage(): any {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
  }
}