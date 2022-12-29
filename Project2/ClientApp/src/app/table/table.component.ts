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

  itemsTocartStr: any;

  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'quantity'];
  dataSource = new MatTableDataSource<Item>();
  constructor() { }

  ngOnInit(): void {
    this.itemsTocartStr = localStorage.getItem('ItemsTocart');
    if ( this.itemsTocartStr != null ||  this.itemsTocartStr != ''){
     this.itemsToCart = JSON.parse(this.itemsTocartStr);
    }
    this.dataSource = new MatTableDataSource<Item>(this.itemsToCart);
  }
}
