import { SignInService } from './../service/signIn.service';
import { Router } from '@angular/router';
import { PrivateMessageService } from './../service/private-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unread-private-messages',
  templateUrl: './unread-private-messages.component.html',
  styleUrls: ['./unread-private-messages.component.css']
})
export class UnreadPrivateMessagesComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  getMessages = localStorage.getItem('unreadPrivateMessages');
  unreadMessagesList = JSON.parse(this.getMessages);

  constructor(private userService:SignInService,
              private messageService:PrivateMessageService,
              private router:Router) { }

  ngOnInit() {
    this.loadUnreadMessages();
  }

  loadUnreadMessages() {
    this.messageService.getUnreadMessages(this.user.id).subscribe((data:any) => {
      localStorage.setItem("unreadPrivateMessages", JSON.stringify(data));
    })
  }

  onPrivateMessages(message:any) {
    this.userService.getUser(message.senderId).subscribe((data:any) =>  {
      localStorage.setItem("selectedReceiver", JSON.stringify(data));
    })
    this.router.navigateByUrl('/private-messages').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }

}
