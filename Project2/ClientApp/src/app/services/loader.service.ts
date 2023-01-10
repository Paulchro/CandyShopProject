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
    this.counter += 1;
    console.log('show: ', this.counter)
    if (this.counter>0){
      console.log('here');
      this.isVisible.next(true); 
    }
  }

  hide() {
    this.counter -= 1;
    console.log('hide: ', this.counter);
    if (this.counter<=0){  
      console.log('here2');    
      this.isVisible.next(false);
    }
  }
}
