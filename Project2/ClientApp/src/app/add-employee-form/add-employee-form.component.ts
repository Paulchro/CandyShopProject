import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      userId: [''],
      firstName: [''],
      lastName: [''],
      username: [''],
      age: [''],
      email: [''],
      imageUrl: [''],
      role: ['']
    });
  }

  createEmployee() {
    console.log(this.employeeForm.value);

}
}
