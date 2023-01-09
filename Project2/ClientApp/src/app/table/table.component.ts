import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'quantity', 'delete'];

  data?: Item[];
  public dataSource = new MatTableDataSource<Item>();

  constructor(public itemService: ItemService, 
    public localStorageService: LocalStorageService) {     
      this.itemsToCart$.subscribe((data:any)=>{
          this.dataSource.data = data;
      });
    }

  totalAmount$:any = this.localStorageService._totalAmount$;
  itemsToCart$:any = this.localStorageService._itemsToCart$;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Item>(this.itemsToCart$._value);
  }

  pay(){
    this.localStorageService.clearDataFromLocalStorage('ItemsToCart');
    this.localStorageService.clearDataFromLocalStorage('TotalAmount');
  }

  deleteCartItem(item:Item){
    this.itemService.deleteCartItem(item);
  }
}
