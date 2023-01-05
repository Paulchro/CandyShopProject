import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    id: 0,
    name: 'All Products',
    completed: false,
    color: 'accent',
    subtasks: [
      {id: 1, name: 'Sweets', completed: false, color: 'accent'},
      {id: 2, name: 'Vegan-Sweets', completed: false, color: 'accent'},
    ],
  };

  allComplete: boolean = true;
  
  constructor(private itemService: ItemService,
    private route: ActivatedRoute,
    _router: Router) { 
      this.router = _router;
    }
    

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      items => {      
        this.items = items;
      },
    );
  }

  addItemToCart(item:Item){
    this.itemService.addItemsToCart(item); 
  }

  updateAllComplete(subtasks : any) {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    this.itemService.getItems().subscribe(
      items => {   
        if (this.allComplete) {
          this.items = items;
        }   
        else {
          subtasks.forEach(
            (subtask:any) => {
              if (subtask.completed)
              {
                this.items = this.items.filter(({categoryId}) => (categoryId == subtask.id) );
              }
            }
          )
          // for (){

          // }
        //   if (subtask.completed) {
        //     this.items = this.items.filter(({category}) => (category === subtask.name) );
        //  }
        //  else if ( subtask.completed ==false){
        //   if (subtask.name === 'Sweets'){
        //     this.items = this.items.filter(({category}) => (category === 'Vegan-Sweets') )
        //   }
        //   else {
        //     this.items = this.items.filter(({category}) => (category === 'Sweets') )

        //   }
         // console.log("swsto")
        //  }
//console.log(subtask.completed);
        }

        console.log('items: ', this.items);
      })    
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
    this.itemService.getItems().subscribe(
      items => {      
        this.items = items;
      },
  );
  }
}
