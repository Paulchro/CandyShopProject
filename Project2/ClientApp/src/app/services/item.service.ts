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
  public isEnabled= new BehaviorSubject<boolean>(true); 
  counter: number = 0;
  

  constructor(private http: HttpClient,
    public localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar) { }

    getItems(): Observable<Item[]> {
        return this.listofItems = this.http.get<Item[]>(environment.base_url +'products')
        .pipe(//  tap(data => console.log('All: ' + JSON.stringify(data))),
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

  initializeItemForm() {
    this.itemForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl('', Validators.required),
      quantity: new FormControl(0, Validators.required),
      price: new FormControl(0, Validators.required),
      categoryId: new FormControl(0, Validators.required), 
      image: new FormControl('', Validators.required) 
    });
    return this.itemForm ;
  }

  initializeItemFormWithData(item: any) {
    this.itemForm = new FormGroup({
      id: new FormControl(item.id, Validators.required),
      name: new FormControl(item.name, Validators.required),
      quantity: new FormControl(item.quantity, Validators.required),
      price: new FormControl(item.price, Validators.required),
      categoryId: new FormControl(item.categoryId, Validators.required), 
      image: new FormControl(item.image, Validators.required) 
    });
    return this.itemForm ;
  }

  addProduct(item: Item){
    console.log(item)
    return this.http.post(environment.base_url + 'products',item).subscribe(
      res => {
        console.log(res);
        this.openSnackBar('A new product has been added.'); 
        this.initializeItemForm();
      },
      err => {
        this.openSnackBar('Error on adding new product.');      
      }
    ); 
  }

  enableDisableForm(){
    this.counter++;   
    if (this.counter%2 == 0){
      this.isEnabled.next(false);
      this.itemForm.disable();
      console.log("here 1");
    }
    else{
      this.isEnabled.next(true);
      console.log("here 2");
      this.itemForm.enable();
    }
    return this.itemForm;
  }
}
