import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  quantity: number = 0;
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.quantity = 0;
    this._snackBar.open('An item has added to cart.', 'Close',{
      duration: this.durationInSeconds * 1000});
  }

}
