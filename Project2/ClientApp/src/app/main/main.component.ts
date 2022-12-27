import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  onAddToCart!: Item;
  cartItemsList: Item[] =[];
  items: Item[] = [];
  

  itemsList:Item[] = [{
    id: 1, 
    name: 'cheesecake',  
    price: '10',
    quantity: 0,
    categoryId: 1
  },
  {
    id: 2, 
    name: 'cake',  
    price: '10',
    quantity: 0,
    categoryId: 1
  },
]

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      items => {
          this.items = items;
          console.log(this.items);
      }
  );
  }

  addItemToCart(item:Item){
    this.cartItemsList.push(item);
    console.log(this.cartItemsList);
  }
}
