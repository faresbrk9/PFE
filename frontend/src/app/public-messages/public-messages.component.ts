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

  messageContent:any;

  constructor(private service: PublicMessageService,
    private router: Router) { }

  ngOnInit() {
    setInterval(() => this.onLoad(), 500);

  }

  onLoad() {
    this.service.getPublishedMessages().subscribe((data:any) => {
      localStorage.setItem("publicMessages", JSON.stringify(data));
    })
  }

  onSend() {
    var message = {
      content:this.messageContent,
      publishedBy:this.user.lastName + " " + this.user.firstName,
      isPublished:true,
      userId:this.user.id
    }

    this.service.sendPublicMessage(message).subscribe();
    setTimeout(() => {window.location.reload();}, 500);
  }

}
