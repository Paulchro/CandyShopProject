import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';

@Component({
  selector: 'app-admin-allproducts',
  templateUrl: './admin-allproducts.component.html',
  styleUrls: ['./admin-allproducts.component.css']
})
export class AdminAllproductsComponent implements OnInit {

  constructor(  public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addProduct(){
    const dialog = this.dialog.open(AddProductFormComponent, {
      disableClose: true
    });
  }
}

