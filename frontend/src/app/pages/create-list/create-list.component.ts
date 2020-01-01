import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  createList = {}

  constructor(private _task: TaskService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this._task.createList(this.createList)
      .subscribe(res => {
        this.router.navigate(['/profile']);
        
      }, err => console.log(err))
  }

}
