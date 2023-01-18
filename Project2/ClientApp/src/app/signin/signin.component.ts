import { Component, OnInit } from '@angular/core';
import { Users } from './signin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // usersList: Users[] =[]

  usersList: Users[]= [{
    name:"soula",
    email:"soula@gmail.com"
  }]
  constructor() { }

  ngOnInit(): void {
  }

  signin(){
    console.log(this.usersList);

  }

}
