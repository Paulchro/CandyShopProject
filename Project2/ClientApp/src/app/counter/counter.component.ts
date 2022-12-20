import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BackModalComponent } from '../back-modal/back-modal.component';



@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  
  constructor(public dialog: MatDialog) { }

  // public currentCount = 0;

  // public incrementCounter() {
  //   this.currentCount++;
  // }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BackModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
