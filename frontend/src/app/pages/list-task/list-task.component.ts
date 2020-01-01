import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: Task[];

  constructor(private _task: TaskService, private aroute: ActivatedRoute,
              private snack: MatSnackBar) { }

  ngOnInit() {
      this.getTask();
  }

  delete(task: Task) {
    this._task.deleteTask(task)
      .subscribe(res => {
        this.getTask();
        this.snack.open('Tarea Eliminada', null, {
          duration: 2000
        })
      })
  };

  changeStatus(selecTask: Task, status:string) {
    const temporalStatus = selecTask.status;
    selecTask.status = status;

    this._task.editTask(selecTask)
      .subscribe(
        res => {
          selecTask.status = status;
        },
        err => {
          console.log(err);
          
          selecTask.status = temporalStatus;
        }
      );
  };


  getTask() {
    this.aroute.params
      .subscribe((params: Params) => {
        this._task.getTasks(params.listId)
          .subscribe((res:Task[]) => {
            this.tasks = res;
            console.log(this.tasks);
          });
      });
  };
}
