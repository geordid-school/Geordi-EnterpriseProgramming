import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { UserSetting } from '../user-setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  hours: number = 0;
  days: number = 2;

  error: boolean = false;

  constructor(private service: SettingsService,
    private router: Router  ) { }

  ngOnInit() {
    this.service.getSetting(1).subscribe((data: UserSetting) => {
      this.days = (data.hoursTilWarning - data.hoursTilWarning % 24) / 24;
      this.hours = data.hoursTilWarning % 24;
    });
  }

  save() {
    if (this.days < 0 || this.hours < 0) {
      this.error = true;
    } else {
      let calcHours = this.days * 24 + this.hours;
      this.service.editSetting(calcHours).subscribe(() => this.router.navigate(['']))
    }
  }

}
