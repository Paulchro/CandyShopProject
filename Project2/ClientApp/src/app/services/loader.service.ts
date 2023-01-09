import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isVisible: BehaviorSubject<number>;
  counter: number=0;
  constructor() {  
    this.isVisible = new BehaviorSubject(0); 
  }

  show() {
    this.counter += 1;
    console.log('show: ', this.counter)
    this.isVisible.next(this.counter); 
  }

  hide() {
      this.counter -= 1;
      console.log('hide: ', this.counter);
      this.isVisible.next(this.counter);
  }
}
