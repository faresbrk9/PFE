import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';
import { Observable } from 'rxjs';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-show-user-list',
  templateUrl: './show-user-list.component.html',
  styleUrls: ['./show-user-list.component.css']
})
export class ShowUserListComponent implements OnInit {

  getUserList = localStorage.getItem('userList');
  userList = JSON.parse(this.getUserList);

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);


  constructor(private service: SignInService,
              private router: Router) { }

  ngOnInit() {
    setInterval(() => this.onLoadUsers(), 500);
  }

  onLoadUsers(){
    this.service.getUsers().subscribe((data:any) => {
      localStorage.setItem("userList", JSON.stringify(data));
    })
    console.log(this.userList);
  }

  onVisit(item:any) {
    localStorage.setItem("selectedUser", JSON.stringify(item));
    if (item.id == this.user.id)
    {
      this.router.navigateByUrl('/user-account')
    }
    else
    {
      this.router.navigateByUrl('/profile');
    }
  }

  onMessage(id) {

  }

}
