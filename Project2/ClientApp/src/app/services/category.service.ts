import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../main/category';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  listofCategories: any;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.listofCategories = this.http.get<Category[]>(environment.base_url +'categories')
    .pipe(
      tap(
        // data => console.log('All: ' + JSON.stringify(data))
      ),
    );   
  }
}
