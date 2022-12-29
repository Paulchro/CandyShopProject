import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-form-cart',
  templateUrl: './form-cart.component.html',
  styleUrls: ['./form-cart.component.css']
})
export class FormCartComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('');

  colorControl = new FormControl('primary' as ThemePalette);


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';


  
}
}
