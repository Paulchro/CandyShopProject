import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { Item } from '../item/item';
import { ItemService } from '../services/item.service';
import { Task } from './Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  router: Router;
  onAddToCart!: Item;
  items: Item[]= [];
  id: any;
  items2: Item[] = [];
  task: Task = {
    name: 'All Products',
    completed: false,
    color: 'accent',
    subtasks: [
      {name: 'Sweets', completed: false, color: 'accent'},
      {name: 'Vegan-Sweets', completed: false, color: 'accent'},
    ],
  };

  allComplete: boolean = true;

  
  constructor(private itemService: ItemService,
    private route: ActivatedRoute,
    _router: Router) { 
      this.router = _router;

    }
    

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItems(this.id).subscribe(
      items => {      
        this.items = items;
   //     console.log('items: ', this.items);
    //    this.items2 = this.items.filter(({category}) => (category === 'Sweets' || category === 'Vegan-Sweets') );
     //   console.log('items2: ', this.items2);
      },
  );

  
  }

  addItemToCart(item:Item){
    this.itemService.addItemsToCart(item); 
  }

  updateAllComplete(subtask : any) {
  //  console.log("sweets click")
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItems(this.id).subscribe(
      items => {   
        if (this.allComplete) {
          this.items = items;
        }   
        else {
          if (subtask.completed) {
            this.items = this.items.filter(({category}) => (category === subtask.name) );
         }
         else if ( subtask.completed ==false){
          if (subtask.name === 'Sweets'){
            this.items = this.items.filter(({category}) => (category === 'Vegan-Sweets') )
          }
          else {
            this.items = this.items.filter(({category}) => (category === 'Sweets') )

          }
         // console.log("swsto")
         }
//console.log(subtask.completed);
        }

        console.log('items: ', this.items);
      })
     //   console.log('items: ', this.items);
       
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }

    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    if (completed==false){
      this.router.navigate(['**']);
    } 
    console.log(completed)
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItems(this.id).subscribe(
      items => {      
        this.items = items;
      },
  );
  }
}
