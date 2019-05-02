import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  create(username: string, password: string): Observable<any> {
    var body = {
      'username': username,
      'password': password
    }
    return this.http.post('api/login/create', body);
  }

  login(username: string, password: string): Observable<any> {
    var body = {
      'username': username,
      'password': password
    }
    return this.http.post('api/login', body);
  }

}
