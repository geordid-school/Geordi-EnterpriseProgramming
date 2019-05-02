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
  visibleTodos: Todo[];

  filterShowCompleted: boolean = false;
  filterTagString: string = "";
  filterTags: string[] = [];

  sortSelect = 0;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.todoService.getTodos()
      .subscribe((data: Todo[]) => { this.todos = data; this.filter() })
  }

  filter() {
    let output: Todo[] = [];

    this.todos.forEach((todo: Todo) => {

      let tagMatch = false;

      if (this.filterTags.length <= 0) {
        tagMatch = true;
      } else {
        this.filterTags.forEach((tag: string) => { 
          if (todo.tags) {
            if (todo.tags.includes(tag.trim())) tagMatch = true;
          }
        });
      }

      if (tagMatch && todo.isComplete === this.filterShowCompleted) {
        output.push(todo);
      }
    });

    this.visibleTodos = this.sort(output);
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

  filterTagsChange() {
    this.filterTags = this.filterTagString.split(',').filter((s: string) => { return s.trim().length > 0 });
    this.filter();
  }

}
