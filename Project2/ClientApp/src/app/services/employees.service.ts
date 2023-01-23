import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Employees } from '../employees/employees';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employees[]> {
  // let users = this.http.get<Employees[]>(environment.base_url +'getallusers')
    return this.http.get<Employees[]>(environment.base_url +'users')
    .pipe( tap(data => console.log('All: ' + JSON.stringify(data))),
    );    
}
}
