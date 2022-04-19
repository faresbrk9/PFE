import { Router } from '@angular/router';
import { SignInService } from './../service/signIn.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userModel = new User('','','','','','','','','');
  constructor(private service: SignInService,
              private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(userForm: NgForm)
  {
    var User = {
      lastName:this.userModel.lastName,
      firstName:this.userModel.firstName,
      email:this.userModel.email,
      password:this.userModel.password,
      cin:this.userModel.CIN,
      tel:this.userModel.tel,
      address:this.userModel.address,
      fax:this.userModel.fax,
      webSite:this.userModel.webSite
    }

    this.service.addUser(User).subscribe();
    setTimeout(() => {this.router.navigateByUrl('/login');
    }, 500);

    }


  onReset()
  {
    this.userModel.lastName = '';
    this.userModel.firstName = '';
    this.userModel.email = '';
    this.userModel.password = '';
    this.userModel.CIN = '';
    this.userModel.tel = '';
    this.userModel.address = '';
    this.userModel.fax = '';
    this.userModel.webSite = '';
  }
}
