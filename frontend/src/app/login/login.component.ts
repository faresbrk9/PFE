import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/userLogin';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginModel = new UserLogin('','');

  constructor(private service: SignInService,
    private router: Router) { }

     userNotFound:boolean = false;
     userBlocked:boolean = false;

  ngOnInit() {
    /*if (this.isUserlogin) {
      this.router.navigate(["/home"]);
    }*/
  }

  onLogin(UserLoginForm: NgForm){
    var User = {
      email:this.userLoginModel.email,
      password:this.userLoginModel.password
    }

    this.service.login(User).subscribe((data:any) => {
      if (data.statusCode == null)
        {
          this.userNotFound = false;
          this.userBlocked = false;
          localStorage.setItem("userInfo", JSON.stringify(data));
          this.router.navigateByUrl('/home').then(() => {window.location.reload();});
        }
      else if(data.statusCode == 404)
        {
          this.userNotFound = true;
          this.userBlocked = false;
        }
      else
        {
          this.userBlocked = true;
          this.userNotFound = false;
        }
    });
  }

  /*get isUserlogin() {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;

}*/

}
