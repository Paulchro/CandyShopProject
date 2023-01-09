import { Component, OnInit } from '@angular/core';
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
  allItems: Item[]= [];
  id: any;
  items2: Item[] = [];
  task: Task = {
    id: 0,
    name: 'All Products',
    completed: true,
    color: 'accent',
    subtasks: [
      {id: 1, name: 'Sweets', completed: true, color: 'accent'},
      {id: 2, name: 'Vegan-Sweets', completed: true, color: 'accent'},
    ],
  };

  allComplete: boolean = true;
  
  constructor(private itemService: ItemService,
    _router: Router) { 
      this.router = _router;
    }
    
  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      items => {      
        this.items = items;
        this.allItems = this.items;
      },
    );
  }

  addItemToCart(item:Item){
    this.itemService.addItemsToCart(item); 
  }

  updateAllComplete(subtasks : any) {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);  
      if (this.allComplete) {
        this.items = this.allItems;
      }   
      else {
        if (this.someComplete()){
          subtasks.forEach(
            (subtask:any) => {
              if (subtask.completed)
              {
                this.items = this.allItems.filter(({categoryId}) => (categoryId == subtask.id));
              }
            }
          )
        }else{
          this.items = [];
        } 
      } 
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.allComplete){
      this.items = this.allItems;
    }
    else {
      this.items = [];
    }
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => {t.completed = completed;});
  }
}
