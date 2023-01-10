import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackModalComponent } from '../back-modal/back-modal.component';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  isCartUrl: boolean = false;

  constructor(private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isCartUrl = window.location.href.includes('cart');
  }

  public goBack(){
    this.router.navigate(['/']);
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BackModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Corfirm your choice',
        content: 'Do you want to leave this page?',
        action: 'back'
      }
    });
  }

}
