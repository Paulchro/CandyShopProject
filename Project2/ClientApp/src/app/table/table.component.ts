import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';

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

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemsToCart = this.itemService.getCartItemsFromLocalStorage();
    this.totalAmount = this.itemService.getTotalAmountFromLocalStorage();
    this.dataSource = new MatTableDataSource<Item>(this.itemsToCart);
  }

  save(){
    this.itemService.removeCartItemsFromLocalStorage();
    this.itemService.removeTotalAmountFromLocalStorage();
  }

  deleteCartItem(item:Item){
    this.itemService.deleteCartItem(item);
    this.refreshMatTable();
    this.refreshTotalAmount();
  }

  refreshMatTable() {
    this.itemsToCart = this.itemService.getCartItemsFromLocalStorage();
    this.dataSource = new MatTableDataSource<Item>(this.itemsToCart);
  }

  refreshTotalAmount(){
    this.totalAmount  = this.itemService.getTotalAmountFromLocalStorage();
  }

}
