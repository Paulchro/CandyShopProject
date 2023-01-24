import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../item/item';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css']
})
export class EditProductFormComponent implements OnInit {

  public itemForm: any;
  categoriesList: any;
  fileName: string = '';
  @Input() item?: Item;
  counter: number = 0;
  
  constructor(private itemService: ItemService,
    private categoryService: CategoryService) { 
    }

  ngOnInit(): void {
    this.itemForm = this.itemService.initializeItemFormWithData(this.item);
    this.itemForm.disable();
    this.categoryService.getCategories().subscribe(
      categories => {      
        this.categoriesList = categories;
    });
  }

  submit(){
    // this.itemService.editProduct(this.itemForm.value);
  }

  changeCategory(event: any){
    if (event.isUserInput) {  
      console.log('You have selected a category!');
    }
  }

  enableDisableForm(){
    this.itemForm = this.itemService.enableDisableForm();
  }
}
