import { Component, Input, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { Employees } from './employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  listemployees: Employees[] =[]

  @Input() employees!: Employees;
  constructor(private employeesService : EmployeesService) { }

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(
     listemployees => {
      this.listemployees = listemployees;
       
      console.log(this.listemployees)
     }
    )
  }
  

}
