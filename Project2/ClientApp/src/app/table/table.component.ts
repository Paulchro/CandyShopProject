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

  constructor(public itemService: ItemService, 
    public localStorageService: LocalStorageService) {     
      this.itemsToCartSub = this.itemsToCart$.subscribe((data:any)=>{
          this.dataSource.data = data;
      });
    }

  totalAmount$:any = this.localStorageService._totalAmount$;
  itemsToCart$:any = this.localStorageService._itemsToCart$;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Item>(this.localStorageService.getDataFromLocalStorage('ItemsToCart')._value);
    console.log(this.dataSource);
    this.totalAmount$ = this.localStorageService.getDataFromLocalStorage('TotalAmount');
    if ( this.totalAmount$.getValue() != 0 && this.itemsToCart$._value != null){
      this.isCartEmpty$.next(false);
    }
   console.log(this.totalAmount$)  
  }

  deleteCartItem(item:Item, isCartEmpty$: BehaviorSubject<boolean>){
    this.itemService.deleteCartItem(item, isCartEmpty$);
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

  ngOnDestroy(){
    this.itemsToCartSub?.unsubscribe();
  }
}
