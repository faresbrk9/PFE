import { MessageResponseService } from './../service/message-response.service';
import { PublicMessageService } from './../service/public-message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-messages',
  templateUrl: './public-messages.component.html',
  styleUrls: ['./public-messages.component.css']
})
export class PublicMessagesComponent implements OnInit {

  getMessages = localStorage.getItem('publicMessages');
  messageList = JSON.parse(this.getMessages);

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  x = 0;
  intervalTest = false;

  getResponses:any;
  responseList:any;

  messageContent:any;
  responseContent:any;

  constructor(private messageService: PublicMessageService,
              private responseService: MessageResponseService,
              private router: Router) { }

  ngOnInit() {
    setInterval(() => this.onLoad(), 500);
    setInterval(() => this.onResponseLoadClick(), 300);
  }

  onLoad() {
    this.messageService.getPublishedMessages().subscribe((data:any) => {
      localStorage.setItem("publicMessages", JSON.stringify(data));
    })
  }

  onSend() {
    var message = {
      content:this.messageContent,
      publishedBy:this.user.lastName + " " + this.user.firstName,
      unreadResponsesCount:0,
      userId:this.user.id,
    }

    this.messageService.sendPublicMessage(message).subscribe();
    setTimeout(() => {window.location.reload();}, 500);
  }

  showResponses(y:any) {
    if (this.x == +y)
    {
      this.x = 0;
      this.intervalTest = false;
    }

    else
    {
      this.x = +y;
      this.intervalTest = false;
      setTimeout(() => {
        this.intervalTest = true;
      }, 1000);
    }
  }

  onResponsesLoad(id:number){
    this.responseService.getResponsesByMessage(id).subscribe((data:any) => {
      localStorage.removeItem("selectedMessageResponses");
      localStorage.setItem("selectedMessageResponses", JSON.stringify(data));
    })
  }

  onResponseLoadClick() {
    if (this.x > 0)
    {
      this.onResponsesLoad(this.x);
      this.getResponses = localStorage.getItem('selectedMessageResponses');
      this.responseList = JSON.parse(this.getResponses);
    }
  }

  onResponseSend(){
    var response = {
      content: this.responseContent,
      publishedBy: this.user.lastName + " " + this.user.firstName,
      isRead: false,
      userId: this.user.id,
      publicMessageId: this.x
    }
    this.responseService.sendResponse(response).subscribe();
    this.responseContent = "";
  }

  onMessageDelete(id:any) {
    this.messageService.deleteMessage(id).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 500);

  }

  onResponseDelete(id:any) {
    this.responseService.deleteResponse(id).subscribe();
  }

  get isAdmin() {
    const getUser = localStorage.getItem('userInfo');
    const user = JSON.parse(getUser);
    return user.isAdmin;
  }

}
