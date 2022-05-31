import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageResponseService } from '../service/message-response.service';
import { PublicMessageService } from '../service/public-message.service';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-public-messages',
  templateUrl: './user-public-messages.component.html',
  styleUrls: ['./user-public-messages.component.css']
})
export class UserPublicMessagesComponent implements OnInit {

  getMessages = localStorage.getItem('userPublicMessages');
  messageList = JSON.parse(this.getMessages);

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  x = 0;
  intervalTest = false;

  getResponses: any;
  responseList: any;

  messageContent: any;
  responseContent: any;

  constructor(private messageService: PublicMessageService,
    private responseService: MessageResponseService,
    private router: Router) { }

  ngOnInit() {
    setInterval(() => this.onLoad(), 100);
  }

  onLoad() {
    this.messageService.getUserMessages(this.user.id).subscribe((data: any) => {
      localStorage.setItem("userPublicMessages", JSON.stringify(data));
    })
  }

  showResponses(y: any) {
    if (this.x == +y) {
      this.x = 0;
      this.intervalTest = false;
    }
    else {
      this.x = +y;
      this.intervalTest = false;

      setTimeout(() => {
        setInterval(() => this.onResponseLoadClick(), 100);
      }, 500);

      setTimeout(() => {
        this.intervalTest = true;
      }, 1000);

      setTimeout(() => {
        for (var response of this.responseList)
        {
          this.responseService.turnRead(response.id).subscribe();
        }
      }, 2000);
    }
  }

  onResponsesLoad(id: number) {
    this.responseService.getResponsesByMessage(id).subscribe((data: any) => {
      localStorage.removeItem("userPublicMessagesResponses");
      localStorage.setItem("userPublicMessagesResponses", JSON.stringify(data));
    })
  }

  onResponseLoadClick() {
    if (this.x > 0) {
      this.onResponsesLoad(this.x);
      this.getResponses = localStorage.getItem('userPublicMessagesResponses');
      this.responseList = JSON.parse(this.getResponses);
    }
  }

  onMessageDelete(id: any) {
    this.messageService.deleteMessage(id).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 500);

  }

  onResponseDelete(id: any) {
    this.responseService.deleteResponse(id).subscribe();
  }

  onSend() {
    var message = {
      content: this.messageContent,
      publishedBy: this.user.lastName + " " + this.user.firstName,
      isPublished: true,
      userId: this.user.id,
    }

    this.messageService.sendPublicMessage(message).subscribe();
    setTimeout(() => { window.location.reload(); }, 500);
  }

  onResponseSend() {
    var response = {
      content: this.responseContent,
      publishedBy: this.user.lastName + " " + this.user.firstName,
      isPublished: true,
      isRead: false,
      userId: this.user.id,
      publicMessageId: this.x
    }
    this.responseService.sendResponse(response).subscribe();
    this.responseContent = "";
  }

}
