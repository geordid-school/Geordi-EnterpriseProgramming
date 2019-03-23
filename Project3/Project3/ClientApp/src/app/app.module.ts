import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchComponent } from './search/search.component';
import { UserResultComponent } from './user-result/user-result.component';
import { UserComponent } from './user/user.component';
import { RepoResultComponent } from './repo-result/repo-result.component';
import { RepoComponent } from './repo/repo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SearchComponent,
    UserResultComponent,
    UserComponent,
    RepoResultComponent,
    RepoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchComponent, pathMatch: 'full' },
      { path: 'user/:login', component: UserComponent },
      { path: 'repo/:user/:name', component: RepoComponent }
      //{ path: 'counter', component: CounterComponent },
      //{ path: 'fetch-data', component: FetchDataComponent },
    ]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
