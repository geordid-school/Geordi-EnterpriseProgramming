import { Injectable } from '@angular/core';

import { Todo } from './todo';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('api/todo');
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('api/todo', todo);
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>('api/todo/' + id);
  }

  editTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('api/todo/' + todo.id, todo);
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>('api/todo/' + id);
  }

}
