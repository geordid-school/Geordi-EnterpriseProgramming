import { Component, OnInit, Input } from '@angular/core';
import { Repo } from '../repo';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repo-result',
  templateUrl: './repo-result.component.html',
  styleUrls: ['./repo-result.component.css']
})
export class RepoResultComponent implements OnInit {

  faStar = faStar;

  @Input() repo: Repo;

  constructor() { }

  ngOnInit() {
  }

}
