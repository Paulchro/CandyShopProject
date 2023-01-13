import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-back-modal',
  templateUrl: './back-modal.component.html',
  styleUrls: ['./back-modal.component.css']
})
export class BackModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BackModalComponent>,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    private itemService: ItemService) { }

  ngOnInit(): void {

  }

  confirm(action: string){
    switch(action) { 
      case 'back': { 
        this.router.navigate(['/']); 
        break; 
      } 
      case 'pay': { 
        this.localStorageService.clearDataFromLocalStorage('ItemsToCart');
        this.localStorageService.clearDataFromLocalStorage('TotalAmount');
        this.localStorageService.clearDataFromLocalStorage('NumberOfItems');
        this.router.navigate(['/']);
        this.itemService.openSnackBar('Your order has been completed!'); 
        break; 
      } 
    } 
  }

  close(){
    this.dialogRef.close();
  }
}

