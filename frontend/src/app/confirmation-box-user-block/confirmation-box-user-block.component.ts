import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-confirmation-box-user-block',
  templateUrl: './confirmation-box-user-block.component.html',
  styleUrls: ['./confirmation-box-user-block.component.css']
})
export class ConfirmationBoxUserBlockComponent implements OnInit {

  id:any;

  constructor(private service: SignInService, private router: Router) { }

  ngOnInit() {
    this.id = history.state.data;
  }

  onDelete() {
    let x: number = +this.id;
    this.service.blockUser(x).subscribe();
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
