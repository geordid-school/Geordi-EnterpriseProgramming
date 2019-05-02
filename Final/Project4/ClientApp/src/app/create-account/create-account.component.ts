import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  username: string;
  password: string;

  length: boolean = false;
  upper: boolean = false;
  lower: boolean = false;
  number: boolean = false;
  duplicate: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  create() {

    this.length = this.upper = this.lower = this.number = false;

    this.loginService.create(this.username, this.password)
      .subscribe(
        () => {
          this.loginService.login(this.username, this.password).subscribe(
            () => this.router.navigateByUrl('/'),
            () => this.router.navigateByUrl('/user/login')
          )},
        (res) => {
          let obj = res.error;
          this.length = obj.length;
          this.upper = obj.upper;
          this.lower = obj.lower;
          this.number = obj.number;
          this.duplicate = obj.duplicate;
        }
      );
  }

}
