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

  constructor(private service:PrivateMessageService) { }

  ngOnInit() {
    this.loadUnreadMessages();
    console.log(this.unreadMessagesList);
  }

  loadUnreadMessages() {
    this.service.getUnreadMessages(this.user.id).subscribe((data:any) => {
      localStorage.setItem("unreadPrivateMessages", JSON.stringify(data));
    })
  }

}
