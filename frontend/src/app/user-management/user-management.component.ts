import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private service: SignInService, private router: Router) { }

  usersList:any;
  blockedUsersList:any;

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
      if(item.isBlocked == false)
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
    let x: number = +id;
    this.service.blockUser(x).subscribe();
    setTimeout(() => {window.location.reload();
    }, 500);

  }

  onUnblock(id:any){
    let x: number = +id;
    console.log(x);
    this.service.unblockUser(x).subscribe();
    setTimeout(() => {window.location.reload();
    },500);

  }

  onDelete(id:any){
    let x: number = +id;
    this.service.declineUser(x).subscribe();
    /*setTimeout(() => {window.location.reload();
    }, 500);*/

  }

  userList(x:any){
    this.usersList = x;
  }

  blockedUserList(x:any){
    this.blockedUsersList = x;
  }

}
