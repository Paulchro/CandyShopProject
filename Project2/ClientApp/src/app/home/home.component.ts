import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  signInForm!: FormGroup;
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: this.username,
      email: this.email
    });
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}