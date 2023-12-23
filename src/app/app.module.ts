import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './features/users/users.module';
import { httpInterceptorProviders } from './core/interceptors';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './core/store/reducers/tasks.reducers';
import { paginationTasksReducer } from './core/store/reducers/paginationTasks.reducers';
import { usersReducer } from './core/store/reducers/users.reducers';
import { paginationUsersReducer } from './core/store/reducers/paginationUsers.reducers';
import { TasksModule } from './features/tasks/tasks.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TasksModule,
    UsersModule,
    StoreModule.forRoot({
      tasks: tasksReducer,
      paginationTasks: paginationTasksReducer,
      users: usersReducer,
      paginationUsers: paginationUsersReducer,
    }),
  ],
  providers: httpInterceptorProviders,
  bootstrap: [AppComponent],
})
export class AppModule {}
