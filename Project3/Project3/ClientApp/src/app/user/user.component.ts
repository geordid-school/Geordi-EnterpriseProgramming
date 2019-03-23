import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs/operators'; 
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getUser(params.get('login'))))
      .subscribe((data: User) => this.user = data);
  }

}
