import { Component, OnInit } from '@angular/core';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';
import { Observable } from 'rxjs';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-show-user-list',
  templateUrl: './show-user-list.component.html',
  styleUrls: ['./show-user-list.component.css']
})
export class ShowUserListComponent implements OnInit {

  userList$!:Observable<any[]>;
  companyList$!:Observable<any[]>;
  //x = localStorage.getItem('userInfo');


  constructor(private service: SignInService) { }

  ngOnInit() {
    this.userList$ = this.service.getUsers();
    this.companyList$ = this.service.getCompanies();
  }

  onDelete(id:number|string){
    this.service.deleteUser(id).subscribe();
    setTimeout(() => {window.location.reload();
    }, 100);

  }

}
