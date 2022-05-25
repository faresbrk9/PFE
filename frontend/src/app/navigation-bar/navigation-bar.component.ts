import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  constructor(private router: Router) {

   }

  ngOnInit() {
    console.log("hello");

  }

  onLogout() {
    localStorage.clear();
  }
  get isUserlogin() {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;
}

  get isAdminLogin() {
  const getUser = localStorage.getItem('userInfo');
  const user = JSON.parse(getUser);
  return this.isUserlogin && user.isAdmin;
}

}
