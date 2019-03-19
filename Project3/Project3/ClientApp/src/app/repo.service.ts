import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepoSearchResult } from './repo-search-result';
import { Observable } from 'rxjs';
import { Repo } from './repo';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  apiUrl: string = 'https://api.github.com'

  constructor(private http: HttpClient) { }

  search(queryString: string, page: number): Observable<RepoSearchResult> {
    if (!page) page = 1;

    var endpoint = `${this.apiUrl}/search/repositories?q=${queryString}&page=${page}&per_page=10`;
    return this.http.get<RepoSearchResult>(endpoint);
  }

  getRepo(login: string): Observable<Repo> {
    var endpoint = `${this.apiUrl}/users/${login}`;
    return this.http.get<Repo>(endpoint);
  }
}
