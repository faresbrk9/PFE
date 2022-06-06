import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-confirmation-box-user-delete',
  templateUrl: './confirmation-box-user-delete.component.html',
  styleUrls: ['./confirmation-box-user-delete.component.css']
})
export class ConfirmationBoxUserDeleteComponent implements OnInit {

  id:any;

  constructor(private service: SignInService, private router: Router) { }

  ngOnInit() {
    this.id = history.state.data;
  }

  onDelete() {
    let x: number = +this.id;
    this.service.declineUser(x).subscribe();
    setTimeout(() => {
      this.router.navigateByUrl('/user-management').then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }, 500);
  }

  onCancel() {
    this.router.navigateByUrl('/user-management').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

}
