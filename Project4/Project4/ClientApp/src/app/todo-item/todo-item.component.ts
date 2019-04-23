import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo';
import * as moment from 'moment'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  formattedDate: string;

  constructor(private router: Router,
    private service: TodoService) { }

  ngOnInit() {
    if (this.todo != null && this.todo.dueDate != null) {
      var momentInstance = moment.utc(this.todo.dueDate).local();
      this.formattedDate = momentInstance.format('lll');
    }
  }

  edit() {
    this.router.navigateByUrl('/create/' + this.todo.id);
  }

  delete() {
    this.service.deleteTodo(this.todo.id).subscribe(() => this.refresh.emit());
  }

  checkIt() {
    this.todo.isComplete = !this.todo.isComplete;
    this.service.editTodo(this.todo).subscribe(() => this.refresh.emit());
  }

}
