import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
          form[this.formData[i].name] = new FormControl('');
        }    
      })
    this.registerForm = new FormGroup(form);
    return this.registerForm;
  }
}
