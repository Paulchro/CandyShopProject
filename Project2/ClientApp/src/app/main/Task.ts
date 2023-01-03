import {ThemePalette} from '@angular/material/core';
import {Component} from '@angular/core';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}