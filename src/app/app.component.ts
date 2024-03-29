import { Component } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

const getObservble = (collection : AngularFirestoreCollection<Task> ) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField : 'id' }).subscribe( (val : Task[]) => {
      subject.next(val);
  })

  return subject;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  todo = getObservble(this.store.collection('todo'));
  inProgress = getObservble(this.store.collection('inProgress'));
  done = getObservble(this.store.collection('done'));

  constructor(private dialog : MatDialog , private store: AngularFirestore )
  {

  }

  drop(event: CdkDragDrop<Task[]>)  : void
  {
    if (event.previousContainer === event.container) {
      return;
    } 
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      return Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item)
      ])
    })
    transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex
    );
  }
  

  edit( list : 'done'|'todo'|'inProgress', task:Task) : void {
    //console.log(list);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width : '300px',
      data :{
         task ,
         enableDelete : true,
       }
     });
     dialogRef
       .afterClosed()
       .subscribe( (result : TaskDialogResult) => {
         if(result.delete){
           this.store.collection(list).doc(task.id).delete();
         }
         else {
            this.store.collection(list).doc(task.id).update(task);
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
          return this.store.collection('todo').add(result.task);
       });
  }
}
