import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserSearchResult } from './user-search-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://api.github.com'

  constructor(private http: HttpClient) { }

  search(queryString: string, page: number): Observable<UserSearchResult> {
    if (!page) page = 1;

    var endpoint = `${this.apiUrl}/search/users?q=${queryString}&page=${page}&per_page=10`;
    return this.http.get<UserSearchResult>(endpoint);
  }

  getUser(login: string) : Observable<User>{
    var endpoint = `${this.apiUrl}/users/${login}`;
    return this.http.get<User>(endpoint);
  }
}
