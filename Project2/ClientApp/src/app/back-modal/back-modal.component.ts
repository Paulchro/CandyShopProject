import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-back-modal',
  templateUrl: './back-modal.component.html',
  styleUrls: ['./back-modal.component.css']
})
export class BackModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BackModalComponent>,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

}

