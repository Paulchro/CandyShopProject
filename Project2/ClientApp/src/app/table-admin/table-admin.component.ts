import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  items: Item[] =[];
  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'status'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement?: Item | null;
  public dataSource:any = new MatTableDataSource<Item>();

  // items:Item[] = [{
  //   id: 1,
  //   name: 'string',
  //   price: 0,
  //   quantity: 0,
  //   categoryId: 1, 
  //   category: 'string',
  //   image: 'string'
  // },
  // {
  //   id: 2,
  //   name: 'string',
  //   price: 0,
  //   quantity: 1,
  //   categoryId: 1, 
  //   category: 'string',
  //   image: 'string'
  // }]
 

  public isEnabled= new BehaviorSubject<boolean>(false); 

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      items => {      
        this.items = items;
        this.dataSource = new MatTableDataSource<Item>(this.items);
        this.dataSource.paginator = this.paginator;
      },
    );
  }
}
