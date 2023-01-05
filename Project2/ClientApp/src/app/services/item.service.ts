import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Item } from '../item/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  itemForm: any;

  constructor(private http: HttpClient,
    public localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar) { }

    getItems(): Observable<Item[]> {
         return this.listofItems = this.http.get<Item[]>(environment.base_url +'products')
         .pipe(
      //  tap(data => console.log('All: ' + JSON.stringify(data))),
      );    
    }

  // getItemsByCategory(id: any): Observable<Item[]> {
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append("categoryid",id);
  //   return this.http.get<Item[]>(environment.base_url + 'products/',{params:queryParams}).pipe(
  //     tap(data => console.log('All: ' + JSON.stringify(data)))
  //   );
  // }

  addItemsToCart(item:Item){
    this.productExistInCart = this.cartItemsList.find(({id}) => id === item.id);
    if (!this.productExistInCart) {
      this.cartItemsList.push({...item, quantity:1});
    }else{
      this.productExistInCart.quantity += 1;
    }
    this.totalAmount += item.price; 
    this.localStorageService.setDataToLocalStorage('ItemsToCart', this.cartItemsList);
    this.localStorageService.setDataToLocalStorage('TotalAmount', this.totalAmount);
  } 

  deleteCartItem(deletedItem:Item){
    this.cartItemsList = this.localStorageService.getDataFromLocalStorage('ItemsToCart')._value;
    console.log(this.cartItemsList);
    this.cartItemsList = this.cartItemsList.filter(item => item.id != deletedItem.id);
    console.log(this.cartItemsList);
    this.updateTotalAmount(deletedItem, 'delete');
    this.localStorageService.setDataToLocalStorage('ItemsToCart', this.cartItemsList);
  }

  updateTotalAmount(item:Item, action:string){
    if (action == 'delete'){
      const amount = item.quantity * item.price;
      this.totalAmount = this.localStorageService.getDataFromLocalStorage('TotalAmount');
      this.totalAmount = this.totalAmount - amount;
      this.localStorageService.setDataToLocalStorage('TotalAmount', this.totalAmount);
    }
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'Close',{
      duration: this.durationInSeconds * 1000});
  }

  initializeItemForm() {
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl(0, Validators.required),
      price: new FormControl(0, Validators.required),
      category: new FormControl('', Validators.required), 
      image: new FormControl('', Validators.required) 
    });
    return this.itemForm ;
  }
}
