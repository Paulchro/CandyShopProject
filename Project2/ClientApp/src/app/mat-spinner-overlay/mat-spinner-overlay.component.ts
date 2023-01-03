import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-mat-spinner-overlay',
  templateUrl: './mat-spinner-overlay.component.html',
  styleUrls: ['./mat-spinner-overlay.component.css']
})
export class MatSpinnerOverlayComponent implements OnInit {

  @Input() value : number = 100;
  @Input() diameter: number = 200;
  @Input() mode : any ="indeterminate";
  @Input() strokeWidth : number = 10;
  @Input() color: string = "accent";

  constructor( public spinnerService: LoaderService) { }

  ngOnInit(): void {
  }

}
