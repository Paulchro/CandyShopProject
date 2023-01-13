import { Component, OnInit } from '@angular/core';
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
  fileName: string = '';
  
  constructor(private itemService: ItemService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.itemForm = this.itemService.initializeItemForm();
   this.categoryService.getCategories().subscribe(
      categories => {      
        this.categoriesList = categories;
   });
    console.log(' this.categoriesList',  this.categoriesList);
  }

  submit(){
    this.itemForm.controls['image'].setValue('assets/images/' + this.fileName);
    this.itemService.addProduct(this.itemForm.value);
  }

  changeCategory(event: any){
    if (event.isUserInput) {  
      console.log('You have selected a category!');
    }
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }
}
