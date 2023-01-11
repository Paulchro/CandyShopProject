import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  numberOfItems$:any = this.localStorageService._numberOfItems$;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.numberOfItems$ = this.localStorageService.getDataFromLocalStorage('NumberOfItems');
  }

}
