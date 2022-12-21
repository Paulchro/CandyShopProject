import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-cart',
  templateUrl: './form-cart.component.html',
  styleUrls: ['./form-cart.component.css']
})
export class FormCartComponent implements OnInit {
  name = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
