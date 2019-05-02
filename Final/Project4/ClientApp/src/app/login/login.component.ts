import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  bad: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        () => this.router.navigateByUrl('/'),
        () => this.bad = true
      );
  }


}
