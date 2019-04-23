import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import * as moment from 'moment'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  faPencilAlt = faPencilAlt;

  formattedDate: string;

  constructor(private router: Router) {  }

  ngOnInit() {
    if (this.todo != null && this.todo.dueDate != null) {
      var momentInstance = moment.utc(this.todo.dueDate).local();
      this.formattedDate = momentInstance.format('lll');
    }
  }

  edit() {
    this.router.navigateByUrl('/create/' + this.todo.id);
  }

}
