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

     x:boolean = true;

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
        {this.x = true;
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          this.router.navigateByUrl('/home')
        }
      else
        {this.x = false;
          console.log("user not found!");}
    });
  }

  /*get isUserlogin() {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;

}*/

}
