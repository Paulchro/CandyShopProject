import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Item } from '../item/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { appConstants } from '../appConstants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  cartItemsList: Item[] =[];
  itemsToCartStr: any;
  productExistInCart?: Item | undefined;
  totalAmount: number = 0;
  numberOfItems: number = 0;
  durationInSeconds = 3;
  listofItems?: Observable<Item[]>;
  itemForm: any;
  totalAmount$:any = this.localStorageService._totalAmount$;
  itemsToCart$:any = this.localStorageService._itemsToCart$; 
  counter: number = 0;
  public isUpdated$ = new BehaviorSubject<boolean>(false);  
  deletedItem?: Item; 

  constructor(private http: HttpClient,
    public localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar) { }

    getItems(currentPage: number, pageSize: number): Observable<Item[]> {
      return this.listofItems = this.http.get<Item[]>(environment.base_url +'products',
      {params: {
          pageNumber: currentPage,
          pageSize: pageSize
        }
      }).pipe(  
        // tap(data => console.log('All: ' + JSON.stringify(data))),
      );    
    }

  addItemsToCart(item:Item){
    this.productExistInCart = this.cartItemsList.find(({id}) => id === item.id);
    if (!this.productExistInCart) {
      this.cartItemsList.push({...item, quantity:1});
    }else{
      this.productExistInCart.quantity++;
    }
    this.totalAmount += item.price;
    this.numberOfItems++; 
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.itemsToCart, this.cartItemsList);
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.totalAmount, this.totalAmount);
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.numberOfItems, this.numberOfItems);
  } 

  deleteCartItem(deletedItem:Item, isCartEmpty$: BehaviorSubject<boolean>){
    this.cartItemsList = this.localStorageService.getDataFromLocalStorage(appConstants.localStorageKey.itemsToCart)._value;
    this.cartItemsList = this.cartItemsList.filter(item => item.id != deletedItem.id);
    this.updateProduct(deletedItem, appConstants.actions.delete);
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.itemsToCart, this.cartItemsList);
    isCartEmpty$.next(this.cartItemsList.length===0);
  }

  updateProduct(item:Item, action:string){
    this.totalAmount = this.totalAmount$.getValue();
    switch(action) { 
      case appConstants.actions.delete: { 
        const amount = item.quantity * item.price;     
        this.totalAmount = this.totalAmount - amount;
        this.numberOfItems = this.numberOfItems - item.quantity;
        break;
      } 
      case appConstants.actions.remove: {
        if (item.quantity > 0){
          item.quantity--;
          this.numberOfItems--;
          this.totalAmount -= item.price; 
          break;
        }else{
          item.quantity = 0;
          break;
        }     
      }
      case appConstants.actions.add: { 
        this.totalAmount += item.price;
        item.quantity++;  
        this.numberOfItems++;
        break;
      }  
    } 
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.totalAmount, this.totalAmount);
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.numberOfItems, this.numberOfItems);
    this.localStorageService.setDataToLocalStorage(appConstants.localStorageKey.itemsToCart, this.itemsToCart$._value);
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'Close',{
      duration: this.durationInSeconds * 1000});
  }

  initializeItemForm(item:any) {
    this.itemForm = new FormGroup({
      id: new FormControl(item == null ? 0 : item.id, Validators.required),
      name: new FormControl(item == null ? '' : item.name, Validators.required),
      quantity: new FormControl(item == null ? 0 : item.quantity, Validators.required),
      price: new FormControl(item == null ? 0 : item.price, Validators.required),
      categoryId: new FormControl(item == null ? 0 : item.categoryId, Validators.required), 
      image: new FormControl(item == null ? '' : item.image, Validators.required) 
    });
    return this.itemForm ;
  }

  enableDisableForm(item: any){
    this.initializeItemForm(item);
    this.counter++;   
    if (this.counter%2 == 0){
      this.itemForm.disable();
      this.updateForm(item);
    }
    else{
      this.itemForm.enable();
    }
    return this.itemForm;
  }

  addProduct(item: Item){
    return this.http.post(environment.base_url + 'products',item).subscribe(
      res => {
        this.openSnackBar('A new product has been added.'); 
        this.initializeItemForm(item);
      },
      err => {
        this.openSnackBar('Error on adding new product.');      
      }
    ); 
  }
  
  updateForm(item: Item){
    const productid = item.id;
    return this.http.put<Item>(environment.base_url + `products/${productid}`,item).subscribe(
      res => {
        this.openSnackBar('A product has been updated.'); 
        console.log(res);
      },
      err => {
        this.openSnackBar('Error on updating a product.');      
      }
    ); 
  }

  deleteItem(item: Item){
    const productid = item.id; 
    return this.http.delete<Item>(environment.base_url + `products/${productid}`).subscribe(
      res => {
        this.openSnackBar('A product has been deleted.');
        console.log(res);
      },
      err => {
        this.openSnackBar('Error on deleting a product.');      
      }
    ); 
  }

  onChanges(): void {
    const initialValue = this.itemForm.value;
    this.itemForm.valueChanges.subscribe((value:any) => {
      console.log(value);
       const hasChange = Object.keys(initialValue).some(key => value.value[key] != initialValue[key])
        console.log('sas', hasChange);
    });
  }
}
