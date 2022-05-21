import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company';
import { User } from '../model/user';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  x = false;

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  getCompany = localStorage.getItem('companyInfo');
  company = JSON.parse(this.getCompany);

  companyListLength = 0;
  companyIndex = 0;

  constructor(private service: SignInService,
    private router: Router) { }

  ngOnInit() {
    this.getCompanyByOwnerId(this.user.id);

    this.companyListLength = this.company.length;

    if(this.company.length > 0)
    {
      this.x = true;
    }
  }

  getCompanyByOwnerId(ownerId:number|string){
    this.service.getCompanyByOwner(ownerId).subscribe((data:any) => {
        localStorage.setItem("companyInfo", JSON.stringify(data));
        this.router.navigateByUrl('/user-account')
        });
  }

  onAdd() {
    this.router.navigateByUrl('/add-company');
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

  onEdit(){
    this.router.navigate(['/company-info-update'], {state: {data: this.companyIndex}});
  }

  onDelete(){
    let x: number = +this.user.id;
    this.service.declineUser(x).subscribe();
    localStorage.clear();
    setTimeout(() => {window.location.reload();
    }, 500);

  }

}
