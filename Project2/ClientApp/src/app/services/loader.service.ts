import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isVisible: BehaviorSubject<boolean>;
  counter: number=0;
  constructor() {  
    this.isVisible = new BehaviorSubject(false); 
  }

  show() {
    this.counter++;
    this.isVisible.next(this.counter>0); 
  }

  hide() {
    this.counter--;   
    this.isVisible.next(this.counter>0);
  }
}
