import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public formData: any;
  public registerForm?: any;

  constructor(private httpClient: HttpClient){
  }

  ngOnInit(){
    this.registerForm = this.getFormControlsFields();
  }

  onSubmit(){}

  getFormControlsFields() {
    let form:any = {};
    this.httpClient.get('/assets/json_forms/forms.json').subscribe((formData: any) =>{
        this.formData = formData.controls;
        
        for (let i=0; i<this.formData.length;i++) {
          const validators = this.addValidator(this.formData[i].validators);
          form[this.formData[i].name] = new FormControl(this.formData[i].value || '', validators);
        }    
      })
    this.registerForm = new FormGroup(form);
    return this.registerForm;
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
}
