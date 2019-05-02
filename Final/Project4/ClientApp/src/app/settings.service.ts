import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserSetting } from './user-setting';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getSetting(id: number): Observable<UserSetting> {
    return this.http.get<UserSetting>('api/UserSettings/' + id);
  }

  editSetting(numOfHours: number): Observable<UserSetting> {
    let setting: UserSetting = new UserSetting();
    setting.id = 1;
    setting.hoursTilWarning = numOfHours;
    return this.http.put<UserSetting>('api/UserSettings/' + setting.id, setting);
  }

  newSetting() {
    let setting: UserSetting = new UserSetting();
    setting.id = 0;
    setting.hoursTilWarning = 48;
    return this.http.post<UserSetting>('api/UserSettings', setting);
  }

}
