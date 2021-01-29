import { Component } from '@angular/core';
import { Task } from './task/task';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  todo : Task[] = [
    { title : "Study" , description : "Study for exams" },
    { title : "Play" , description : "Play Minecraft" }
  ];

  inProgress : Task[] = [];

  done : Task[] = [];

  drop(event)
  {
    console.log("Called");
  }
}
