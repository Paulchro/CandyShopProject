import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-component',
  templateUrl: './back-component.component.html',
  styleUrls: ['./back-component.component.css']
})
export class BackComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goBack(){
    this.router.navigate(['/']);
  }
}
