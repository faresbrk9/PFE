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

  userFound:boolean = false;
  inscriptionSuccess:boolean = false;

  constructor(private service: SignInService,
              private router: Router) {}

  ngOnInit(): void {
    /*if (this.isUserlogin) {
      this.router.navigate(["/home"]);
    }*/
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
      webSite:this.userModel.webSite,
      isAccepted:false,
      isBlocked:false,
      isAdmin:false

    }

    this.service.addUser(User).subscribe((data:any) => {
      if (data.statusCode == 401)
      {
        this.userFound = true;
      }

      else if (data.statusCode == 404)
      {
        this.userFound = false;
        this.inscriptionSuccess = true;
        setTimeout(() => {this.router.navigateByUrl('/login');
        }, 1000);
      }

      else
      {
        this.userFound = false;
        this.inscriptionSuccess = false;
      }
    });
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

  /*get isUserlogin() {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;

}*/
}
