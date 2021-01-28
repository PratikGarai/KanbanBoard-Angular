import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  tasks : Task[] = [
    { title : "Study" , description : "Study for exams" },
    { title : "Play" , description : "Play Minecraft" }
  ]

}
