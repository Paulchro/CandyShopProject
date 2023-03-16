import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-grid-table-bootstrap',
  templateUrl: './grid-table-bootstrap.component.html',
  styleUrls: ['./grid-table-bootstrap.component.css']
})
export class GridTableBootstrapComponent implements OnInit {

  items: Item[] =[];

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.itemService.getItems(0, 0).subscribe(
      items => {      
        this.items = items;
        console.log(items)
      },
    );
  }

}
