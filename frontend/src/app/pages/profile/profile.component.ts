import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  lists: List[];

  constructor(private _tesk: TaskService) { }


  ngOnInit() {
    this.getLists();
  }
  
  getLists() {
    this._tesk.getLists()
    .subscribe((res:List[]) => {
      
      this.lists = res;
      console.log(this.lists);
        
      })
  }

  delete(list: List) {
    this._tesk.deleteList(list)
      .subscribe(res => {
        this.getLists();
      })
  }
}
