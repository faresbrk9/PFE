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

  companyInfo = new Company('','','','','','','','','','','','','','')
  getCompany = localStorage.getItem('companyInfo');
  company = JSON.parse(this.getCompany);

  constructor(private service: SignInService,
    private router: Router) { }

  ngOnInit() {
    this.getCompanyByOwnerId(this.user.id);
    this.companyInfo.raisonSociale = this.company.raisonSociale;
    this.companyInfo.capitalSociale = this.company.capitalSociale;
    this.companyInfo.siegeSociale = this.company.siegeSociale;
    this.companyInfo.formeJuridique = this.company.formeJuridique;
    this.companyInfo.matriculeFiscal = this.company.matriculeFiscal;
    this.companyInfo.RNE = this.company.RNE;
    this.companyInfo.secteurActivite = this.company.secteurActivite;
    this.companyInfo.produits = this.company.produits;
    this.companyInfo.nbreEmployes = this.company.nbreEmployes;
    this.companyInfo.tel = this.company.tel;
    this.companyInfo.fax = this.company.fax;
    this.companyInfo.email = this.company.email;
    this.companyInfo.webSite = this.company.webSite;

    console.log(this.company);
    console.log(this.companyInfo);
  }

  addCompnay(){
    var Company = {
      raisonSociale:this.companyInfo.raisonSociale,
      capitalSociale:this.companyInfo.capitalSociale,
      siegeSociale:this.companyInfo.siegeSociale,
      formeJuridique:this.companyInfo.formeJuridique,
      matriculeFiscal:this.companyInfo.matriculeFiscal,
      RNE:this.companyInfo.RNE,
      secteurActivite:this.companyInfo.secteurActivite,
      produits:this.companyInfo.produits,
      nbreEmployes:this.companyInfo.nbreEmployes,
      tel:this.companyInfo.tel,
      fax:this.companyInfo.fax,
      email:this.companyInfo.email,
      webSite:this.companyInfo.webSite,
      UserId:parseInt(this.user.id)
    }

    this.service.addCompany(Company).subscribe();
    setTimeout(() => {this.router.navigateByUrl('/user-account');
    }, 500);
  }

  getCompanyByOwnerId(ownerId:number|string){
    this.service.getCompanyByOwner(ownerId).subscribe((data:any) => {
      this.x = true;
          localStorage.setItem("companyInfo", JSON.stringify(data));
          this.router.navigateByUrl('/user-account')
        });
  }

}
