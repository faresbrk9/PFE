import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-user-info-update',
  templateUrl: './user-info-update.component.html',
  styleUrls: ['./user-info-update.component.css']
})
export class UserInfoUpdateComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);
  userInfo = new User('','','','','','','','','');

  constructor(private service: SignInService,
    private router: Router) { }

  ngOnInit() {
    this.userInfo.lastName = this.user.lastName;
    this.userInfo.firstName = this.user.firstName;
    this.userInfo.email = this.user.email;
    this.userInfo.CIN = this.user.cin;
    this.userInfo.tel = this.user.tel;
    this.userInfo.address = this.user.address;
    this.userInfo.fax = this.user.fax;
    this.userInfo.webSite = this.user.webSite;

  }

  onEdit() {
    var User = {
      id:this.user.id,
      lastName:this.userInfo.lastName,
      firstName:this.userInfo.firstName,
      email:this.userInfo.email,
      cin:this.userInfo.CIN,
      tel:this.userInfo.tel,
      address:this.userInfo.address,
      fax:this.userInfo.fax,
      webSite:this.userInfo.webSite,
      password:"null",
      isAccepted:true,
      isAdmin:false
    }
    this.service.editUser(User).subscribe((data:any) => {
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
    });
    setTimeout(() => {this.router.navigateByUrl('/user-account').then(() => {
      window.location.reload();
    });
    }, 500);
  }

  onCancel() {
    this.router.navigateByUrl('/user-account');
  }

}
