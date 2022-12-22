import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-back-modal',
  templateUrl: './back-modal.component.html',
  styleUrls: ['./back-modal.component.css']
})
export class BackModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BackModalComponent>,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

  }

  goToCart(){

  }

  goToHome(){
    this.router.navigate(['/']);
  }


}

