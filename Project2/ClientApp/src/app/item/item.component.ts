import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../services/item.service';
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

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    console.log(this.item);
  }

  addToCart(){
    this.onAddToCart.emit(this.item);
    this.itemService.openSnackBar('An item added to cart!');
  }

}
