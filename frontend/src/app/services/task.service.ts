import { Injectable } from '@angular/core';
import { WebReqService } from './web-req.service';
import { Task } from '../models/task.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _web: WebReqService) { }

  createList(list) {
    return this._web.post('lists',list);
  };

  getLists() {
    return this._web.get('lists');
  };

  deleteList(list: List) {
    return this._web.delete(`lists/${list._id}`);
  };

  getTasks(listId:String) {
    return this._web.get(`lists/${listId}/tasks`);
  };

  createTask(listId:String, task) {
    return this._web.post(`lists/${listId}/tasks`, task);
  };

  editTask(task: Task) {
    return this._web.patch(`lists/${task._listId}/tasks/${task._id}`,task);
  };

  deleteTask(task: Task) {
    return this._web.delete(`lists/${task._listId}/tasks/${task._id}`);
  };

  createTaskUpload(listId:String, task: FormData) {
    return this._web.post(`lists/${listId}/tasks/upload`, task);
  }


}
