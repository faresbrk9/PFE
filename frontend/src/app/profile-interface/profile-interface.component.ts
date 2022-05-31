import { Router } from '@angular/router';
import { SignInService } from './../service/signIn.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-interface',
  templateUrl: './profile-interface.component.html',
  styleUrls: ['./profile-interface.component.css']
})
export class ProfileInterfaceComponent implements OnInit {

  x = false;

  getSelectedUser = localStorage.getItem('selectedUser');
  selectedUser = JSON.parse(this.getSelectedUser);

  getSelectedUserCompany = localStorage.getItem('selectedUserCompanyInfo');
  selectedUserCompany = JSON.parse(this.getSelectedUserCompany);

  companyListLength = 0;
  companyIndex = 0;

  constructor(private service:SignInService,
              private router:Router) { }

  ngOnInit() {
    this.getCompanyByOwnerId(this.selectedUser.id);

    this.companyListLength = this.selectedUserCompany.length;

    if(this.selectedUserCompany.length > 0)
    {
      this.x = true;
    }
  }

  getCompanyByOwnerId(id:number|string){
    this.service.getCompanyByOwner(id).subscribe((data:any) => {
        localStorage.setItem("selectedUserCompanyInfo", JSON.stringify(data));
        this.router.navigateByUrl('/profile')
        });
  }

  onNext() {
    if (this.companyIndex < this.companyListLength - 1)
    {
      this.companyIndex = this.companyIndex + 1;
      console.log(this.companyIndex);
    }
  }

  onPrevious() {
    if (this.companyIndex > 0)
    {
      this.companyIndex = this.companyIndex - 1;
    }
  }

  onMessage(item:any) {
    localStorage.setItem("selectedReceiver", JSON.stringify(item));
    this.router.navigateByUrl('/private-messages').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
  });
}
}
