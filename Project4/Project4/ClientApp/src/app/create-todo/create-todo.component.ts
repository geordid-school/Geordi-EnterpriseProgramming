import { Component, OnInit, PACKAGE_ROOT_URL } from '@angular/core';
import { Todo } from '../todo';
import * as moment from 'moment'
import { TodoService } from '../todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  newTodo: Todo = new Todo();

  hasDueDate = true;

  newDate: Date;
  hour: number = 5;
  minute: number = 0;
  period: number = 2;
  validTime: boolean = true;

  editMode: boolean = false;

  constructor(private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.todoService.getTodo(Number(params.get('id'))))
    ).subscribe((data: Todo) => this.populate(data));

    this.newDate = moment().toDate();
  }

  populate(editTodo: Todo) {
    if (editTodo) {
      this.editMode = true;

      this.newTodo = editTodo;

      this.newDate = moment(new Date(this.newTodo.dueDate)).local().toDate();
      let momentDate = moment.utc(this.newTodo.dueDate).local();

      this.hour = momentDate.hours();
      if (this.hour == 0) {
        this.hour = 12;
      } else if (this.hour >= 12) {
        this.period = 2;
        if (this.hour > 12) this.hour -= 12;
      } else {
        this.period = 1;
      }

      this.minute = momentDate.minutes();

    }
  }

  createTodo() {
    //fix the hour to account for 12/24 time
    var fixedHour = this.hour;
    if (fixedHour == 12) { 
      fixedHour = 0;
    }
    if (this.period == 2) {
      fixedHour += 12;
    }

    this.newDate = new Date(this.newDate);

    //set time
    let date = new Date(this.newDate.getFullYear(), this.newDate.getMonth(), this.newDate.getDate() + 1, fixedHour, this.minute, 0);
    this.newTodo.dueDate = moment(date).utc().toDate();

    //Upload
    if (this.editMode) {
      this.todoService.editTodo(this.newTodo).subscribe(() => this.router.navigate(['']));
    } else {
      this.todoService.createTodo(this.newTodo).subscribe(() => this.router.navigate(['']));
    }
  }

  checkTime() {
    this.validTime = this.hour <= 12 && this.hour >= 1 && this.minute <= 59 && this.minute >= 0;
  }

}
