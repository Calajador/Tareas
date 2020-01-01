import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTask = {
    name: null,
    description: null
  };
  listId: String;
  selectedFile: File = null;

  constructor(private _task: TaskService, private aroute: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {

    this.aroute.params
      .subscribe((params:Params) => {
        this.listId = params.listId;
      })
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0]
  }

  createUploadImage() {
    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    fd.append('name', this.createTask.name);
    fd.append('description', this.createTask.description);
    this._task.createTaskUpload(this.listId, fd)
      .subscribe(res => {
        this.router.navigate([`/profile/lists/${this.listId}`]);
      })
  }

  create() {
    this._task.createTask(this.listId, this.createTask)
      .subscribe(res => {
        this.router.navigate([`/profile/lists/${this.listId}`]);
      })
  }
}
