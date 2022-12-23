import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from './item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item!: Item;
  @Output() onAddToCart: EventEmitter<Item> = new EventEmitter();
  quantity: number = 0;
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.item);
  }

  addToCart(){
    this.onAddToCart.emit(this.item);
    this.quantity = 0;
    this._snackBar.open('An item has added to cart.', 'Close',{
      duration: this.durationInSeconds * 1000});
  }

}
