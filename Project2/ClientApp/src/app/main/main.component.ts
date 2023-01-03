import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  onAddToCart!: Item;
  items: Item[]= [];
  id: any;
  items2: Item[] =[];

  
  constructor(private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItems(this.id).subscribe(
      items => {
        this.items = items;
        this.items2= this.items.filter(item => item.category =="Sweets" )
         console.log(this.items2);
        console.log(this.items);
      }
  );
  }

  addItemToCart(item:Item){
    this.itemService.addItemsToCart(item); 
  }
}
