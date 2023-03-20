import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cart',
  templateUrl: './form-cart.component.html',
  styleUrls: ['./form-cart.component.css']
})
export class FormCartComponent {
  public formData: any;
  public cartForm?: any;

  constructor(private httpClient: HttpClient){
  }

  ngOnInit(){
    this.cartForm = this.getFormControlsFields();
  }

  onSubmit(){}

  getFormControlsFields() {
    let form:any = {};
    this.httpClient.get('/assets/json_forms/forms.json').subscribe((formData: any) =>{
        this.formData = formData.controlscart;
        
        for (let i=0; i<this.formData.length;i++) {
          const validators = this.addValidator(this.formData[i].validators);
          form[this.formData[i].name] = new FormControl(this.formData[i].value || '', validators);
        }    
      })
    this.cartForm = new FormGroup(form);
    return this.cartForm;
  }

  private addValidator(validators: any) {
    if (!validators) {
      return [];
    }

    const validatorsN = Object.keys(validators).map((rulvalidator): any => {
      switch (rulvalidator) {
        case "required":
          return Validators.required;    
        case "minLength":
          return Validators.minLength(10);
      }
    });
    return validatorsN;
  }
//   email = new FormControl('', [Validators.required, Validators.email]);

//   name = new FormControl('');

//   colorControl = new FormControl('primary' as ThemePalette);

//   hideRequiredControl = new FormControl(false);

//   floatLabelControl = new FormControl('auto' as FloatLabelType);

//   showname: string = '';

//   options = this._formBuilder.group({
//     hideRequired: this.hideRequiredControl,
//     floatLabel: this.floatLabelControl,
//   });


//   getErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'You must enter a value';
//     }

//     return this.email.hasError('email') ? 'Not a valid email' : '';
  
// }
// constructor(private _formBuilder: FormBuilder) {}

//   getFloatLabelValue(): FloatLabelType {
//     return this.floatLabelControl.value || 'auto';
//   }
}
