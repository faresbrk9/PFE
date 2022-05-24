import { PrivateMessageService } from './../service/private-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.css']
})
export class PrivateMessagesComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  getReceiver = localStorage.getItem('selectedReceiver');
  receiver = JSON.parse(this.getReceiver);

  getMessages:any;
  messageList:any;

  newMessage:any;

  constructor(private service:PrivateMessageService) { }

  ngOnInit() {
    console.log(this.receiver);
    setInterval(() => this.onReload(), 100);
  }

  onLoad() {
    var cor = {
      loggedInId:this.user.id,
      receiverId:this.receiver.id
    }
    this.service.getPrivateMessages(cor).subscribe((data:any) => {
      localStorage.setItem("privateMessages", JSON.stringify(data));
      console.log(data);
    });


  }

  onReload() {
    this.onLoad();
    setTimeout(() => {
    this.getMessages = localStorage.getItem('privateMessages');
    this.messageList = JSON.parse(this.getMessages);
  }, 100);
  }

  onSend() {
    var message = {
      content:this.newMessage,
      isRead:true,
      senderId:this.user.id,
      receiverId:this.receiver.id
    }

    this.service.sendPrivateMessage(message).subscribe();
    this.newMessage = "";
  }

}
