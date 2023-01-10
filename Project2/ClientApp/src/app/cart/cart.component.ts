import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackModalComponent } from '../back-modal/back-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BackModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Corfirm your order',
        content: 'Do you want to complete your order?',
        action: 'pay'
      }
    }
      );
  }

}
