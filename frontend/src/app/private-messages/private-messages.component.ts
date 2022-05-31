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
    setInterval(() => this.onReload(), 200);
    setInterval(() => this.readMsg(), 500);
  }

  onLoad() {
    var cor = {
      loggedInId:this.user.id,
      receiverId:this.receiver.id
    }
    this.service.getPrivateMessages(cor).subscribe((data:any) => {
      localStorage.setItem("privateMessages", JSON.stringify(data));
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
      sentBy:this.receiver.lastName + " " + this.receiver.firstName,
      isRead:false,
      senderId:this.user.id,
      receiverId:this.receiver.id
    }

    this.service.sendPrivateMessage(message).subscribe();
    this.newMessage = "";
  }

  onDelete(id:any) {
    console.log("clicked");
    this.service.deleteMessage(id).subscribe();
    window.location.reload();
  }

  readMsg() {
    for (var msg of this.messageList)
    {
      if (msg.receiverId == this.user.id)
      {
        this.service.turnRead(msg.id).subscribe();
      }
    }
  }

}
