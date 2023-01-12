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
    if (this.counter>0){
      this.isVisible.next(true); 
    }
  }

  hide() {
    this.counter -= 1;
    if (this.counter<=0){     
      this.isVisible.next(false);
    }
  }
}
