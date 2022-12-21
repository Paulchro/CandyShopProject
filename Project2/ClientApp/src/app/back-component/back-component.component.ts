import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackModalComponent } from '../back-modal/back-modal.component';

@Component({
  selector: 'app-back-component',
  templateUrl: './back-component.component.html',
  styleUrls: ['./back-component.component.css']
})
export class BackComponentComponent implements OnInit {

  isCartUrl: boolean = false;

  constructor(private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isCartUrl = window.location.href.includes('counter');
  }

  public goBack(){
    this.router.navigate(['/']);
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BackModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
