
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Employees } from '../employees/employees';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employeeForm:any;
  durationInSeconds = 3;


  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }
  getEmployees(): Observable<Employees[]> {
  // let users = this.http.get<Employees[]>(environment.base_url +'getallusers')
    return this.http.get<Employees[]>(environment.base_url +'users')
    .pipe( tap(data => console.log('All: ' + JSON.stringify(data))),
    );    
}

openSnackBar(message: string){
  this._snackBar.open(message, 'Close',{
    duration: this.durationInSeconds * 1000});
}

addEmployee(employee: Employees){
  console.log(employee)
  return this.http.post(environment.base_url + 'users',employee).subscribe(
    res => {
      console.log(res);
      this.openSnackBar('A new employee has been added.'); 
      this.initializeItemForm();
    },
    err => {
      this.openSnackBar('Error on adding new employee.');      
    }
  ); 
}

initializeItemForm() {
  this.employeeForm = new FormGroup({
    userId: new FormControl(0, Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    age: new FormControl(0, Validators.required), 
    email: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    role: new FormControl(0, Validators.required) 

  });
  return this.employeeForm ;
}

}
