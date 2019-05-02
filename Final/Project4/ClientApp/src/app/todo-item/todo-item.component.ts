import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo';
import * as moment from 'moment'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { UserSetting } from '../user-setting';
import { SettingsService } from '../settings.service';

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

  warn: boolean = false;
  past: boolean = false;

  constructor(private router: Router,
    private service: TodoService,
    private settingsService: SettingsService ) { }

  ngOnInit() {
    if (this.todo != null && this.todo.dueDate != null) {
      var momentInstance = moment.utc(this.todo.dueDate).local();
      this.formattedDate = momentInstance.format('lll');
    }

    this.settingsService.getSetting(1)
      .subscribe((data: UserSetting) => {
        let hoursTilDue = moment.duration(moment.utc(this.todo.dueDate).diff(moment.utc())).asHours();
        if (hoursTilDue <= 0) {
          this.past = true;
        } else if (hoursTilDue <= data[0].hoursTilWarning) {
          this.warn = true;
        }
      },
      (error) => {
        let hoursTilDue = moment.duration(moment.utc(this.todo.dueDate).diff(moment.utc())).asHours();
        if (hoursTilDue <= 0) {
          this.past = true;
        } else if (hoursTilDue <= 48) {
          this.warn = true;
        }

        this.settingsService.newSetting().subscribe();
      });
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
