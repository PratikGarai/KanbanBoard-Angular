import { Component } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import {TaskDialogComponent, TaskDialogResult} from './task-dialog/task-dialog.component';

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

  constructor(private dialog : MatDialog )
  {

  }

  drop(event: CdkDragDrop<Task[]>)  : void
  {
    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  newTask() : void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width : '300px',
      data :{
         task : {}
       }
     })
     dialogRef
       .afterClosed()
       .subscribe( (result : TaskDialogResult) => {
         //console.log(result);
         if(result.task.title && result.task.description)
          return this.todo.push(result.task);
       });
  }
}
