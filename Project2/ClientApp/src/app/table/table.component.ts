import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  public isCartEmpty$ = new BehaviorSubject<boolean>(true);
  private itemsToCartSub?: Subscription;
  
  totalAmount$:any = this.localStorageService._totalAmount$;
  itemsToCart$:any = this.localStorageService._itemsToCart$; 

  constructor(public itemService: ItemService, 
    public localStorageService: LocalStorageService) {     
      this.itemsToCartSub = this.itemsToCart$.subscribe((data:any)=>{
          this.dataSource.data = data;
      });
    }

  ngOnInit(): void {
    this.localStorageService.initializeData();
    // if (this.totalAmount$.getValue() != 0 && this.itemsToCart$._value != null){
    this.isCartEmpty$.next(this.totalAmount$.getValue() === 0 || this.itemsToCart$._value == null);
    console.log(this.totalAmount$)  
  }

  deleteCartItem(item:Item, isCartEmpty$: BehaviorSubject<boolean>){
    this.itemService.deleteCartItem(item, isCartEmpty$);
  }

  updateProduct(item: Item, action: string){
    this.itemService.updateProduct(item,action);
  }

  ngOnDestroy(){
    this.itemsToCartSub?.unsubscribe();
  }
}
