import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs'

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInService } from './service/signIn.service';
import { ShowUserListComponent } from './show-user-list/show-user-list.component';
import { LoginComponent } from './login/login.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';

const appRoutes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'user-account', component: UserAccountComponent},
  {path: 'show-list',component: ShowUserListComponent},
  {path: 'sign-up',component: SignInComponent},
  {path: 'login', component: LoginComponent},
  {path : 'user-management', component: UserManagementComponent},
  {path: '',component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ShowUserListComponent,
      LoginComponent,
      NavigationBarComponent,
      UserAccountComponent,
      HomeComponent,
      UserManagementComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot()
  ],
  providers: [SignInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
