import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';
import { appConstants } from "../appConstants";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public _itemsToCart$ = new BehaviorSubject<Item[]>([]);
  public _totalAmount$ = new BehaviorSubject<number>(0);
  public _numberOfItems$ = new BehaviorSubject<number>(0);
  public dataStr: any;
  public data: any;

  constructor() { }

  public setDataToLocalStorage(key: string, value: Item[] | number) {
    localStorage.setItem(key, JSON.stringify(value))
    if (typeof value == 'object'){
      this._itemsToCart$.next(value)
    }else{
      if (key === appConstants.localStorageKey.totalAmount){
        this._totalAmount$.next(value)
      }else{
        this._numberOfItems$.next(value)
      }   
    }
  }

 public getDataFromLocalStorage(key: string): any{
    this.dataStr  = localStorage.getItem(key);
    switch(key) { 
      case appConstants.localStorageKey.itemsToCart: { 
        this.data = JSON.parse(this.dataStr);
        this._itemsToCart$.next(this.data);
        return this._itemsToCart$;
      } 
      case appConstants.localStorageKey.totalAmount: { 
        this.data = Number(this.dataStr);
        this._totalAmount$.next(this.data);
        return this._totalAmount$;
      }
      case appConstants.localStorageKey.numberOfItems: { 
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

 public initializeData(){
    this.getDataFromLocalStorage(appConstants.localStorageKey.itemsToCart);
    this.getDataFromLocalStorage(appConstants.localStorageKey.totalAmount);
 }
}
