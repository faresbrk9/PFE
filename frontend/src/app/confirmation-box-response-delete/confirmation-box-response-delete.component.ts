import { MessageResponseService } from './../service/message-response.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-box-response-delete',
  templateUrl: './confirmation-box-response-delete.component.html',
  styleUrls: ['./confirmation-box-response-delete.component.css']
})
export class ConfirmationBoxResponseDeleteComponent implements OnInit {

  id:any;

  constructor(private responseService:MessageResponseService,
              private router:Router) { }

  ngOnInit() {
    this.id = history.state.data;
  }

  onDelete() {
    this.responseService.deleteResponse(this.id).subscribe();
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
