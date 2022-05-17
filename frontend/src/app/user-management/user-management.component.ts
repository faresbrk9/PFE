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

  waitingUsers:any;

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
      if(item.isAccepted == false)
      {
        arr.push(item);
      }
    }
    console.log(arr);
    this.waitingList(arr);

      }


  onDecline(id:any){
    let x: number = +id;
    this.service.declineUser(x).subscribe();
    /*setTimeout(() => {window.location.reload();
    }, 100);*/

  }

  onAccept(id:any){
    let x: number = +id;
    console.log(x);
    this.service.acceptUser(x).subscribe();
    /*setTimeout(() => {window.location.reload();
    },100);*/

  }

  waitingList(x:any){
    this.waitingUsers = x;
  }

}
