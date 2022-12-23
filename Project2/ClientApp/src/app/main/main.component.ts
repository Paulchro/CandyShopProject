import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item/item';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  onAddToCart!: Item;
  cartItemsList: Item[] =[];

  itemsList:Item[] = [{
    id: 1, 
    name: 'cheesecake',  
    price: '10',
    quantity: '0',
    categoryId: 1
  },
  // {
  //   id: 2, 
  //   name: 'cake',  
  //   price: '10',
  //   quantity: '0',
  //   categoryId: 1
  // },
]

  constructor() { }

  ngOnInit(): void {
  }

  addItemToCart(item:Item){
    this.cartItemsList.push(item);
  }
}
