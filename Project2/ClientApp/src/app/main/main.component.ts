import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  onAddToCart!: Item;
  items: Item[] = [];
  
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
    this.itemService.addItemsToCart(item);  
  }
}
