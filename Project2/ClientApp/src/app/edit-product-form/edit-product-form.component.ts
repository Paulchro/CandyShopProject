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
    this.itemForm = this.itemService.initializeItemForm(this.item);
    this.itemForm.disable();
    this.categoryService.getCategories().subscribe(
      categories => {      
        this.categoriesList = categories;
    });
  }

  enableDisableForm(item: any){
    this.itemForm.controls['image'].setValue('assets/images/' + this.fileName);
    this.itemForm = this.itemService.enableDisableForm(item);
  }


onFileSelected(event: any) {
  const file:File = event.target.files[0];
  if (file) {
    this.fileName = file.name;
  }
}
}
