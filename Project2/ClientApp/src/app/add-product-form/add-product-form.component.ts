import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddProductFormComponent>,
    private dateAdapter: DateAdapter<Date>) { 
      this.dateAdapter.setLocale('en-GB') 
    }

  ngOnInit(): void {
    this.itemForm = this.itemService.initializeItemForm();
   this.categoryService.getCategories().subscribe(
      categories => {      
        this.categoriesList = categories;
   });
  }

  submit(){
    this.itemForm.controls['image'].setValue('assets/images/' + this.fileName);
    this.itemService.addProduct(this.itemForm.value);
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
