import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Item } from '../item/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  cartItemsList: Item[] =[];
  map = new Map();
  productExistInCart?: Item | undefined;

  constructor(private http: HttpClient) { }

  getItemsByCategory(id: any): Observable<Item[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("categoryid",id);
    return this.http.get<Item[]>(environment.base_url + 'products/',{params:queryParams}).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
  }

  addItemsToCart(item:Item): Item[]{
    this.productExistInCart = this.cartItemsList.find(({id}) => id === item.id);
    if (!this.productExistInCart) {
      this.cartItemsList.push({...item, quantity:1}); 
    }else{
      this.productExistInCart.quantity += 1;
    }
    console.log(this.cartItemsList);
    this.saveData('ItemsTocart', JSON.stringify(this.cartItemsList));
    return this.cartItemsList;
  } 

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
