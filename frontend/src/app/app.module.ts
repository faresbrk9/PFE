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
import { PublicMessagesComponent } from './public-messages/public-messages.component';
import { UserInfoUpdateComponent } from './user-info-update/user-info-update.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyInfoUpdateComponent } from './company-info-update/company-info-update.component';
import { ProfileInterfaceComponent } from './profile-interface/profile-interface.component';
import { PrivateMessagesComponent } from './private-messages/private-messages.component';
import { InscriptionManagementComponent } from './inscription-management/inscription-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserPublicMessagesComponent } from './user-public-messages/user-public-messages.component';
import { UnreadPrivateMessagesComponent } from './unread-private-messages/unread-private-messages.component';

const appRoutes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'user-account',component: UserAccountComponent},
  {path: 'user-info-update',component: UserInfoUpdateComponent},
  {path: 'add-company',component: AddCompanyComponent},
  {path: 'company-info-update',component: CompanyInfoUpdateComponent},
  {path: 'show-list',component: ShowUserListComponent},
  {path: 'sign-up',component: SignInComponent},
  {path: 'login',component: LoginComponent},
  {path: 'user-management',component: UserManagementComponent},
  {path: 'public-messages',component: PublicMessagesComponent},
  {path: 'private-messages',component: PrivateMessagesComponent},
  {path: 'profile',component: ProfileInterfaceComponent},
  {path: 'inscription-management',component: InscriptionManagementComponent},
  {path: 'user-public-messages',component: UserPublicMessagesComponent},
  {path: 'unread-messages',component: UnreadPrivateMessagesComponent},
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
    UserManagementComponent,
    PublicMessagesComponent,
      UserInfoUpdateComponent,
      AddCompanyComponent,
      CompanyInfoUpdateComponent,
      ProfileInterfaceComponent,
      PrivateMessagesComponent,
      InscriptionManagementComponent,
      UserPublicMessagesComponent,
      UnreadPrivateMessagesComponent
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
