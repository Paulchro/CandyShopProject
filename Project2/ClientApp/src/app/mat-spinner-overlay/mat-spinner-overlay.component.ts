import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-mat-spinner-overlay',
  templateUrl: './mat-spinner-overlay.component.html',
  styleUrls: ['./mat-spinner-overlay.component.css']
})
export class MatSpinnerOverlayComponent implements OnInit {

  value: number = 100;
  diameter: number = 100;
  mode : any ="indeterminate";
  strokeWidth : number = 10;
  color: string = "accent";

  constructor( public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
