import { Router } from '@angular/router';
import { PublicMessageService } from './../service/public-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-box-public-message-delete',
  templateUrl: './confirmation-box-public-message-delete.component.html',
  styleUrls: ['./confirmation-box-public-message-delete.component.css']
})
export class ConfirmationBoxPublicMessageDeleteComponent implements OnInit {

  id:any;

  constructor(private messageService:PublicMessageService,
              private router:Router) { }

  ngOnInit() {
    this.id = history.state.data;
  }

  onDelete() {
    this.messageService.deleteMessage(this.id).subscribe();
    setTimeout(() => {
      this.router.navigateByUrl('/public-messages').then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }, 500);
  }

  onCancel() {
    this.router.navigateByUrl('/public-messages').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

}
