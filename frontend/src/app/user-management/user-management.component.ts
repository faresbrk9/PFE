import { Component, OnInit } from '@angular/core';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  getUserList = localStorage.getItem('userList');
  userList = JSON.parse(this.getUserList);
  waitingUsers = this.unacceptedList();
  //companyList$ = this.service.getCompanies();

  constructor(private service: SignInService) { }

  ngOnInit() {
    //window.location.reload();
    this.service.getUsers().subscribe((data:any) =>
      {
        console.log(data);
        localStorage.setItem("userList", JSON.stringify(data));
    });

      }



  onDecline(id:number|string){
    this.service.declineUser(id).subscribe();
    setTimeout(() => {window.location.reload();
    }, 100);

  }

  onAccept(id:number|string){
    this.service.acceptUser(id).subscribe();
    setTimeout(() => {window.location.reload();
    },100);

  }

  unacceptedList (){

    let arr:any = [];
    for (var item of this.userList)
    {
      if(item.isAccepted == false)
      {
        arr.push(item);
      }
    }

    return arr
  }

}
