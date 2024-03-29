import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ListComponent } from './list/list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthInterceptor } from './auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListComponent,
    TodoItemComponent,
    CreateTodoComponent,
    SettingsComponent,
    CreateAccountComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ListComponent, pathMatch: 'full' },
      { path: 'create', component: CreateTodoComponent },
      { path: 'create/:id', component: CreateTodoComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'user/create', component: CreateAccountComponent },
      { path: 'user/login', component: LoginComponent }
    ]),
    FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useFactory: function (router: Router) {
      return new AuthInterceptor(router);
    },
    multi: true,
    deps: [Router]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
