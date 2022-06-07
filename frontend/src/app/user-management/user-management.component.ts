import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  usersList:any;
  blockedUsersList:any;

  constructor(private service: SignInService, private router: Router) { }


  ngOnInit() {
    this.service.getUsers().subscribe((data:any) =>
      {
        console.log(data);
        localStorage.setItem("userList", JSON.stringify(data));
    });
    let getUserList = localStorage.getItem('userList');
    let arr:any = [];
    for (var item of JSON.parse(getUserList))
    {
      if((item.isBlocked == false) && (item.isAccepted == true))
      {
        arr.push(item);
      }
    }
    console.log(arr);
    this.userList(arr);

    let ar:any = [];
    for (var item of JSON.parse(getUserList))
    {
      if(item.isBlocked == true)
      {
        ar.push(item);
      }
    }

    console.log(ar);
    this.blockedUserList(ar);

      }


  onBlock(id:any){
    this.router.navigate(['/confirmation-box-user-block'], {state: {data: id}});
  }

  onUnblock(id:any){
    this.router.navigate(['/confirmation-box-user-unblock'], {state: {data: id}});
  }

  onDelete(id:any){
    this.router.navigate(['/confirmation-box-user-delete'], {state: {data: id}});
  }

  userList(x:any){
    this.usersList = x;
  }

  blockedUserList(x:any){
    this.blockedUsersList = x;
  }

}
