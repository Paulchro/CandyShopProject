import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-back-modal',
  templateUrl: './back-modal.component.html',
  styleUrls: ['./back-modal.component.css']
})
export class BackModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BackModalComponent>) { }

  ngOnInit(): void {


  }

//  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
//     this.dialog.open(BackModalComponent, {
//       width: '250px',
//       enterAnimationDuration,
//       exitAnimationDuration,
//     });
//   }
}

