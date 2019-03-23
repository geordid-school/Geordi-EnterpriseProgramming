import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RepoService } from '../repo.service';
import { switchMap } from 'rxjs/operators';
import { Repo } from '../repo';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  faStar = faStar;
  faEye = faEye;

  repo: Repo;
  page: number = 1;

  constructor(private route: ActivatedRoute, private service: RepoService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getRepo(params.get('user'), params.get('name'), this.page)))
      .subscribe((data: Repo) => { this.repo = data });
  }

  //https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  next() {
    this.page++;
    this.getData();
  }

  prev() {
    if (this.page > 1) this.page--;
    this.getData();
  }

  hasNext() {
    return this.repo.open_issues - (this.page * 10) > 0;
  }

  hasPrev() {
    return this.page > 1;
  }
}
