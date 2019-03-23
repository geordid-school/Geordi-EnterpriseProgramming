import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepoSearchResult } from './repo-search-result';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Repo } from './repo';
import { Commit } from './commit';
import { Issue } from './issue';

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

  getRepo(login: string, name: string, page: number): Observable<Repo> {
    var endpoint = `${this.apiUrl}/repos/${login}/${name}`;
    return this.http.get<Repo>(endpoint).pipe(
      tap(repo => {
        //removing trailing {/sha} which is real annoying
        repo.commits_url = repo.commits_url.substring(repo.commits_url.length - 6) === '{/sha}' ? repo.commits_url.substring(0, repo.commits_url.length - 6) : repo.commits_url
        repo.commits = [];

        //get commits
        this.http.get<Commit[]>(repo.commits_url).pipe(
          map(data => data.map(commit => this.commitFromJson(commit))))
          .subscribe((commits: Commit[]) => repo.commits = (commits.length >= 5 ? commits.slice(0, 5) : commits));

        //removing trailing {/number}
        repo.issues_url = repo.issues_url.substring(repo.issues_url.length - 9) === '{/number}' ? repo.issues_url.substring(0, repo.issues_url.length - 9) : repo.issues_url
        repo.issues_url += '?page=' + page + '&per_page=10';
        repo.issues = [];

        this.http.get<Issue[]>(repo.issues_url).pipe(
          map(data => data.map(issue => this.issueFromJson(issue))))
          .subscribe((issues: Issue[]) => repo.issues = issues);

      })
    );
  }

  commitFromJson(json: any): Commit {
    const commit = new Commit();

    commit.author = json.commit.author.name;
    commit.html_url = json.html_url;
    commit.message = json.commit.message;
    commit.comment_count = json.commit.comment_count;

    return commit;
  }

  issueFromJson(json: any): Issue {
    const issue = new Issue();

    issue.title = json.title;
    issue.createdDate = json.created_at;
    issue.url = json.html_url;

    return issue;
  }
}
