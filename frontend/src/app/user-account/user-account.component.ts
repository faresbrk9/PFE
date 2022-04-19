import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  constructor(private service: SignInService,
    private router: Router) { }

  ngOnInit() {
  }

}
