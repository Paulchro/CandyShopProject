import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {FloatLabelType} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-form-cart',
  templateUrl: './form-cart.component.html',
  styleUrls: ['./form-cart.component.css']
})
export class FormCartComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('');

  colorControl = new FormControl('primary' as ThemePalette);

  hideRequiredControl = new FormControl(false);

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  showname: string = '';

  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  
}
constructor(private _formBuilder: FormBuilder) {}

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
