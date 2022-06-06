import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-confirmation-box-user-account-delete',
  templateUrl: './confirmation-box-user-account-delete.component.html',
  styleUrls: ['./confirmation-box-user-account-delete.component.css']
})
export class ConfirmationBoxUserAccountDeleteComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  constructor(private service: SignInService,
              private router: Router) { }

  ngOnInit() {
  }

  onDelete() {
    let x: number = +this.user.id;
    this.service.declineUser(x).subscribe();
    localStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/home').then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }, 500);
  }

  onCancel() {
    this.router.navigateByUrl('/user-account').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

}
