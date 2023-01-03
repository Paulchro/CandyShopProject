import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public _myData$ = new BehaviorSubject<Item[] | number>(0);
  public myData$ = this._myData$.asObservable()
  public dataStr: any;
  public v: any;

  constructor() { }

  setDataToLocalStorage(key: string, value: Item[] | number) {
    localStorage.setItem(key, JSON.stringify(value))
    this._myData$.next(value)
 }

 getDataFromLocalStorage(key: string) {
    this.dataStr  = localStorage.getItem(key);
    console.log('Lalalallal', this.dataStr);
    // if (this.dataStr != null ||  this.dataStr != '' || this.dataStr != undefined){
      if (key == 'ItemsToCart'){
        this.v = JSON.parse(this.dataStr);
        this._myData$.next(this.v);
        return this.v;
      }
      else{
        this.v = Number(this.dataStr);
        this._myData$.next(this.v);
        return this.v;
      // }
    }
 }

 clearDataFromLocalStorage(key: string) {
    localStorage.removeItem(key)
    this._myData$.next(0)
 }

 clearAllLocalStorage() {
    localStorage.clear()
    this._myData$.next(0)
 }
}
