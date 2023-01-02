import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Item } from '../item/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  cartItemsList: Item[] =[];
  itemsToCartStr: any;
  productExistInCart?: Item | undefined;
  totalAmount: number = 0;
  durationInSeconds = 3;
  listofItems?: Observable<Item[]>;

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

    getItems(id: any): Observable<Item[]> {
         return this.listofItems = this.http.get<Item[]>(environment.base_url +'products')
         .pipe(
       tap(data => console.log('All: ' + JSON.stringify(data))),
    
     );    
      }

  // getItemsByCategory(id: any): Observable<Item[]> {
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append("categoryid",id);
  //   return this.http.get<Item[]>(environment.base_url + 'products/',{params:queryParams}).pipe(
  //     tap(data => console.log('All: ' + JSON.stringify(data)))
  //   );
  // }

  addItemsToCart(item:Item): Item[]{
    this.productExistInCart = this.cartItemsList.find(({id}) => id === item.id);
    if (!this.productExistInCart) {
      this.cartItemsList.push({...item, quantity:1});
    }else{
      this.productExistInCart.quantity += 1;
    }
    this.totalAmount += item.price; 
    this.saveDataToLocalStorage('ItemsTocart', JSON.stringify(this.cartItemsList));
    this.saveDataToLocalStorage('TotalAmount', JSON.stringify(this.totalAmount));
    return this.cartItemsList;
  } 

  public saveDataToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getCartItemsFromLocalStorage(){
    this.itemsToCartStr = localStorage.getItem('ItemsTocart');
    if (this.itemsToCartStr != null ||  this.itemsToCartStr != ''){
     this.cartItemsList = JSON.parse(this.itemsToCartStr);
    }
    return this.cartItemsList;
  }

  getTotalAmountFromLocalStorage(){
    this.totalAmount = Number(localStorage.getItem('TotalAmount'));
    return this.totalAmount;
  }

  removeCartItemsFromLocalStorage(){
    localStorage.removeItem('ItemsTocart');
  }

  removeTotalAmountFromLocalStorage(){
    localStorage.removeItem('TotalAmount');
  }

  deleteCartItem(deletedItem:Item){
    this.cartItemsList = this.getCartItemsFromLocalStorage();
    console.log(this.cartItemsList);
    this.cartItemsList = this.cartItemsList.filter(item => item.id != deletedItem.id);
    console.log(this.cartItemsList);
    this.updateTotalAmount(deletedItem, 'delete');
    this.saveDataToLocalStorage('ItemsTocart', JSON.stringify(this.cartItemsList));
  }

  updateTotalAmount(item:Item, action:string){
    if (action == 'delete'){
      const amount = item.quantity * item.price;
      this.totalAmount = this.getTotalAmountFromLocalStorage();
      this.totalAmount = this.totalAmount - amount;
      this.saveDataToLocalStorage('TotalAmount', JSON.stringify(this.totalAmount));
    }
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'Close',{
      duration: this.durationInSeconds * 1000});
  }
}
