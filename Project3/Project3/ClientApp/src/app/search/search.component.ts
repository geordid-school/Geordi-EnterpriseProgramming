import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { UserSearchResult } from '../user-search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  queryString: string;
  userResults: User[];
  numResults: number;
  page: number = 1;

  testUser: User;

  isLoading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  search(pageNum: number) {
    if (!pageNum) pageNum = 1;

    this.isLoading = true;
    this.userService.search(this.queryString, pageNum)
      .subscribe(
        (data: UserSearchResult) => { this.userResults = data.items; this.numResults = data.total_count; this.isLoading = false; this.testUser = data.items[0]; });
  }


  next() {
    this.page++;
    this.search(this.page);
    window.scrollTo(0, 0);
  }

  prev() {
    if (this.page >= 1) {
      this.page--;
      this.search();
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
