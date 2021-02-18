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

  edit( list : 'done'|'todo'|'inProgress', task:Task) : void {
    //console.log(list);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width : '300px',
      data :{
         task ,
         enableDelete : true,
       }
     })
     dialogRef
       .afterClosed()
       .subscribe( (result : TaskDialogResult) => {
         const dataList = this[list];
         const taskIndex = dataList.indexOf(task);
         if(result.delete) {
            dataList.splice(taskIndex,1);
         }
         else {
            dataList[taskIndex] = task;
         }
       });
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
