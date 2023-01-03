import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  itemsToCart: Item[] =[];
  totalAmount: any;
  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'quantity', 'delete'];
  dataSource = new MatTableDataSource<Item>();



  constructor(private itemService: ItemService, 
    private localStorageService: LocalStorageService) { }

    totalAmount$ = this.localStorageService.myData$;

  ngOnInit(): void {
    this.itemsToCart = this.localStorageService.getDataFromLocalStorage('ItemsToCart');
    console.log('ItemsToCart', this.itemsToCart);
    this.totalAmount = this.localStorageService.getDataFromLocalStorage('TotalAmount');
    console.log('TotalAmount', this.totalAmount);
    this.dataSource = new MatTableDataSource<Item>(this.itemsToCart);
  }

  save(){
    this.localStorageService.clearDataFromLocalStorage('ItemsToCart');
    this.localStorageService.clearDataFromLocalStorage('TotalAmount');
    // this.localStorageService.removeTotalAmountFromLocalStorage();
  }

  deleteCartItem(item:Item){
    this.itemService.deleteCartItem(item);
    this.refreshMatTable();
    this.refreshTotalAmount();
  }

  refreshMatTable() {
    this.itemsToCart = this.localStorageService.getDataFromLocalStorage('ItemsToCart');
    this.dataSource = new MatTableDataSource<Item>(this.itemsToCart);
  }

  refreshTotalAmount(){
    // this.totalAmount  = this.itemService.getTotalAmountFromLocalStorage();
  }

}
