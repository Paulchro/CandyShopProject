import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  itemForm: any;
  categoriesList: any;
  
  constructor(private itemService: ItemService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.itemForm = this.itemService.initializeItemForm();
    this.categoriesList = this.categoryService.getCategories();
  }

  submit(){

  }

  changeCategory(event: any){
    if (event.isUserInput) {  
      console.log('You have selected a category!');
    }
  }

}
