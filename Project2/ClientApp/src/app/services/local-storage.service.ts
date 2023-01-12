import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public _itemsToCart$ = new BehaviorSubject<Item[]>([]);
  public _totalAmount$ = new BehaviorSubject<number>(0);
  public _numberOfItems$ = new BehaviorSubject<number>(0);
  // public itemsToCart$ = this._itemsToCart$.asObservable();
  // public totalAmount$ = this._totalAmount$.asObservable();
  public dataStr: any;
  public data: any;

  constructor() { }

  public setDataToLocalStorage(key: string, value: Item[] | number) {
    localStorage.setItem(key, JSON.stringify(value))
    if (typeof value == 'object'){
      this._itemsToCart$.next(value)
    }else{
      if (key === 'TotalAmount'){
        this._totalAmount$.next(value)
      }else{
        this._numberOfItems$.next(value)
      }   
    }
  }

 public getDataFromLocalStorage(key: string): any{
    this.dataStr  = localStorage.getItem(key);
    switch(key) { 
      case 'ItemsToCart': { 
        this.data = JSON.parse(this.dataStr);
        this._itemsToCart$.next(this.data);
        // console.log('itemsToCart$: ', this.itemsToCart$);
        return this._itemsToCart$;
      } 
      case 'TotalAmount': { 
        this.data = Number(this.dataStr);
        this._totalAmount$.next(this.data);
        return this._totalAmount$;
      }
      case 'NumberOfItems': { 
        this.data = Number(this.dataStr);
        this._numberOfItems$.next(this.data);
        return this._numberOfItems$;
      }  
    } 
 }

 public clearDataFromLocalStorage(key: string) {
    localStorage.removeItem(key)
    this._itemsToCart$.next([])
    this._totalAmount$.next(0)
    this._numberOfItems$.next(0)
 }
}
