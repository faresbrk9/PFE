import { SignInService } from './../service/signIn.service';
import { PrivateMessageService } from './../service/private-message.service';
import { MessageResponseService } from './../service/message-response.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  x:number;
  y:number;

  constructor(private router: Router, private responseService:MessageResponseService,
              private privateMessageService: PrivateMessageService,
              private service: SignInService) {

   }

  ngOnInit() {
    setInterval(() => this.x = this.onResponseNotificationsLoad(), 500);
    setInterval(() => this.y = this.onPrivateMessagesNotificationsLoad(), 500);
    setInterval(() => this.onReload(), 3000);
  }

  onResponseNotificationsLoad() {
    if (this.isUserlogin == true)
    {
      this.responseService.getNotifications(this.user.id).subscribe((data:any) =>
        {
          localStorage.setItem("responseNotifications", JSON.stringify(data));
        });
      let responseNotifications = localStorage.getItem('responseNotifications');
      let notificationsCount = JSON.parse(responseNotifications);
      let x = notificationsCount.count;
      return x;
    }
  }

  onPrivateMessagesNotificationsLoad() {
    if (this.isUserlogin == true)
    {
      this.privateMessageService.getNotifications(this.user.id).subscribe((data:any) =>
        {
          localStorage.setItem("privateMessagesNotifications", JSON.stringify(data));
        });
      let responseNotifications = localStorage.getItem('privateMessagesNotifications');
      let notificationsCount = JSON.parse(responseNotifications);
      let x = notificationsCount.count;
      return x;
    }
  }

  onReload() {
    if (this.isUserlogin == true)
    {
      var info = {
        id: this.user.id,
        token: this.user.token
      }
      this.service.reloadUser(info).subscribe((data:any) => {
        if (data.statusCode == null)
        {
          localStorage.setItem("userInfo", JSON.stringify(data));
          this.getUser = localStorage.getItem('userInfo');
          this.user = JSON.parse(this.getUser);
        }

        else
        {
          this.onLogout();
        }
      });
    }
  }

  onLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  onPublicMessages() {
    this.router.navigateByUrl('/public-messages').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  onMyProfile() {
    this.router.navigateByUrl('/user-account').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  onUsersList() {
    this.router.navigateByUrl('/show-list').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  onMyPublicMessages() {
    this.router.navigateByUrl('/user-public-messages').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  onMyReceivedMessages() {
    this.router.navigateByUrl('/unread-messages').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  onInscriptionManagement() {
    this.router.navigateByUrl('/inscription-management').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  onUserManagement() {
    this.router.navigateByUrl('/user-management').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  get isUserlogin() {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;
}

  get isAdminLogin() {
  const getUser = localStorage.getItem('userInfo');
  const user = JSON.parse(getUser);
  return this.isUserlogin && user.isAdmin;
}

}
