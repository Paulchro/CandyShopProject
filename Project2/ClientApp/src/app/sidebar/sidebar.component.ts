import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public loading?: boolean;
  public isAuthenticated?: boolean;
  public title?: string;

  public isBypass?: boolean;
  public mobile?: boolean;
  public isMenuInitOpen?: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private _snackBar: MatSnackBar) { }

    private sidenav?: MatSidenav;

    public isMenuOpen = true;
    public contentMargin = 240;

    get isHandset(): boolean {
      return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }


  ngOnInit() {
    this.isMenuOpen = true;  // Open side menu by default
    this.title = 'CandyShop';
  }

  ngDoCheck() {
      if (this.isHandset) {
         this.isMenuOpen = false;
      } else {
         this.isMenuOpen = true;
      }
  }

  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'notif-error'
    });
  }

  public onSelectOption(option: any): void {
    const msg = `Chose option ${option}`;
    this.openSnackBar(msg);

    /* To route to another page from here */
    // this.router.navigate(['/home']);
  }

//   ngDoCheck() {
//     if (this.isHandset) {
//       this.isMenuOpen = false;
//     } else {
//       this.isMenuOpen = true;
//     }      
// }

}
