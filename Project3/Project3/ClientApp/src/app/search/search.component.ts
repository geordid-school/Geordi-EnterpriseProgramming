import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { UserSearchResult } from '../user-search-result';
import { RepoService } from '../repo.service';
import { Repo } from '../repo';
import { RepoSearchResult } from '../repo-search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  queryString: string;
  searchType: number = 0;
  userResults: User[];
  repoResults: Repo[];

  numResults: number;
  page: number = 1;
  isLoading: boolean;
  initialLoad: boolean = true;
  error: boolean;

  constructor(private userService: UserService, private repoService: RepoService) { }

  ngOnInit() {
  }

  search(pageNum: number) {
    if (!pageNum) pageNum = 1;

    this.isLoading = true;
    this.initialLoad = false;
    this.error = false;
    this.userResults = this.repoResults = [];

    try {
      if (this.searchType === 0) { // User
        this.userService.search(this.queryString, pageNum)
          .subscribe((data: UserSearchResult) => { this.userResults = data.items; this.numResults = data.total_count; this.isLoading = false; });
      } else {
        this.repoService.search(this.queryString, pageNum)
          .subscribe((data: RepoSearchResult) => { this.repoResults = data.items; this.numResults = data.total_count; this.isLoading = false; })
      }
    }
    catch {
      this.isLoading = false;
      this.initialLoad = true; //just so we don't show both the no results and the error dialog
      this.error = true;
    }

  }


  next() {
    this.page++;
    this.search(this.page);
    window.scrollTo(0, 0);
  }

  prev() {
    if (this.page >= 1) {
      this.page--;
      this.search(this.page);
      window.scrollTo(0, 0);
    }
  }

  hasNext(): boolean {
    return this.numResults - (this.page * 10) > 0;
  }

  hasPrev(): boolean {
    return this.page > 1;
  }

}
