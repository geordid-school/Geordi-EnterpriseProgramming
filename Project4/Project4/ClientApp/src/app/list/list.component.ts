import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos: Todo[];

  filterShowCompleted: boolean = false;

  sortSelect = 0;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    console.log("refreshing");

    this.todoService.getTodos()
      .subscribe((data: Todo[]) => { this.todos = this.filter(data) })
  }

  filter(items: Todo[]): Todo[] {
    let output: Todo[] = [];

    items.forEach((todo: Todo) => {
      if (todo.isComplete === this.filterShowCompleted) {
        output.push(todo);
      }
    });

    return this.sort(output);
  }

  sort(items: Todo[]): Todo[] {
    let output: Todo[] = items;
    let tempSortSelect = this.sortSelect;

    if (this.sortSelect > 0) {
      output = items.sort(function (a: Todo, b: Todo) {

        if (tempSortSelect <= 2) { //Then name sort

          let aName = a.name.toLowerCase();
          let bName = b.name.toLowerCase();
          let result = 0;

          if (aName < bName) result = -1;
          if (aName > bName) result = 1;
          if (tempSortSelect == 2) result *= -1;

          return result;

        } else { //then due date sort

          let mod = tempSortSelect == 4 ? -1 : 1;

          return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * mod;

        }
      });
    }

    return output;
  }

}
