import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from './user';
import { UserSearchResult } from './user-search-result';
import { Repo } from './repo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://api.github.com'

  constructor(private http: HttpClient) { }

  search(queryString: string, page: number): Observable<UserSearchResult> {
    if (!page) page = 1;

    var endpoint = `${this.apiUrl}/search/users?q=${queryString}&page=${page}&per_page=10`;
    return this.http.get<UserSearchResult>(endpoint).pipe(catchError((err: HttpErrorResponse) => { throw err }));
  }

  getUser(login: string) : Observable<User>{
    var endpoint = `${this.apiUrl}/users/${login}`;
    return this.http.get<User>(endpoint).pipe(
      tap(user => {
        //pull in repos
        this.http.get<Repo[]>(user.repos_url)
          .subscribe((repos: Repo[]) => user.repos = repos);

        //pull in followers
        this.http.get<User[]>(user.followers_url)
          .subscribe((users: User[]) => user.followers = users);
      })
    );
  }
}
