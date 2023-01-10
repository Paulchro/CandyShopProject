import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackModalComponent } from '../back-modal/back-modal.component';
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
  isCartUrl: boolean = false;

  constructor(public itemService: ItemService, 
    public localStorageService: LocalStorageService) {     
      this.itemsToCart$.subscribe((data:any)=>{
          this.dataSource.data = data;
      });
    }

  totalAmount$:any = this.localStorageService._totalAmount$;
  itemsToCart$:any = this.localStorageService._itemsToCart$;

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<Item>(this.itemsToCart$._value);
    this.dataSource = new MatTableDataSource<Item>(this.localStorageService.getDataFromLocalStorage('ItemsToCart')._value);
    this.totalAmount$ = this.localStorageService.getDataFromLocalStorage('TotalAmount'); 
  }

  deleteCartItem(item:Item){
    this.itemService.deleteCartItem(item);
  }

  updateQuantity(item: Item, action: string){
    if (action == 'remove'){  
      if (item.quantity > 0){
        item.quantity -= 1;
        this.itemService.updateTotalAmount(item, action);
      }else{
        item.quantity = 0;
      }
    }else{   
      item.quantity += 1;   
      this.itemService.updateTotalAmount(item, action);
    }
    this.localStorageService.setDataToLocalStorage('ItemsToCart', this.itemsToCart$._value);
  }
}
