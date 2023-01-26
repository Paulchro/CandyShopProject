import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../services/employees.service';


@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  fileName: string = '';


  constructor(
    public dialogRef: MatDialogRef<AddEmployeeFormComponent>,
    private employeeService: EmployeesService
    ) { }

  ngOnInit(): void {
    this.employeeForm = this.employeeService.initializeItemForm();

    // this.employeeForm = this.fb.group({
    //   userId: [''],
    //   firstName: [''],
    //   lastName: [''],
    //   username: [''],
    //   age: [''],
    //   email: [''],
    //   imageUrl: [''],
    //   role: ['']
    // });
  }

  createEmployee() {
    this.employeeForm.controls['imageUrl'].setValue('assets/images/' + this.fileName);
    this.employeeService.addEmployee(this.employeeForm.value);
    this.dialogRef.close();
    console.log(this.employeeForm.value);

}

onFileSelected(event: any) {
  const file:File = event.target.files[0]; //pairnei file
  if (file) {
    this.fileName = file.name;  //name
  }
}

closeDialog() {
  this.dialogRef.close();
}
}