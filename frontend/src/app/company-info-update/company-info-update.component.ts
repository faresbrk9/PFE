import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-company-info-update',
  templateUrl: './company-info-update.component.html',
  styleUrls: ['./company-info-update.component.css']
})
export class CompanyInfoUpdateComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  companyIndex:any;

  companyInfo = new Company('','','','','','','','','','','','','','');
  getCompany = localStorage.getItem('companyInfo');
  company = JSON.parse(this.getCompany);

  constructor(private service: SignInService,
    private router: Router) { }

  ngOnInit() {
    this.companyIndex = history.state.data;

    this.companyInfo.raisonSociale = this.company[this.companyIndex].raisonSociale;
    this.companyInfo.capitalSociale = this.company[this.companyIndex].capitalSociale;
    this.companyInfo.siegeSociale = this.company[this.companyIndex].siegeSociale;
    this.companyInfo.formeJuridique = this.company[this.companyIndex].formeJuridique;
    this.companyInfo.matriculeFiscal = this.company[this.companyIndex].matriculFiscal;
    this.companyInfo.RNE = this.company[this.companyIndex].rne;
    this.companyInfo.secteurActivite = this.company[this.companyIndex].secteurActivite;
    this.companyInfo.produits = this.company[this.companyIndex].produits;
    this.companyInfo.nbreEmployes = this.company[this.companyIndex].nbreEmployes;
    this.companyInfo.tel = this.company[this.companyIndex].tel;
    this.companyInfo.fax = this.company[this.companyIndex].fax;
    this.companyInfo.email = this.company[this.companyIndex].email;
    this.companyInfo.webSite = this.company[this.companyIndex].webSite;

    console.log(this.companyIndex);
    console.log(this.company)
  }

  onEdit() {
    var Company = {
      id:this.company[this.companyIndex].id,
      raisonSociale:this.companyInfo.raisonSociale,
      capitalSociale:this.companyInfo.capitalSociale,
      siegeSociale:this.companyInfo.siegeSociale,
      formeJuridique:this.companyInfo.formeJuridique,
      matriculFiscal:this.companyInfo.matriculeFiscal,
      rne:this.companyInfo.RNE,
      secteurActivite:this.companyInfo.secteurActivite,
      produits:this.companyInfo.produits,
      nbreEmployes:this.companyInfo.nbreEmployes,
      tel:this.companyInfo.tel,
      fax:this.companyInfo.fax,
      email:this.companyInfo.email,
      webSite:this.companyInfo.webSite,
      userId:parseInt(this.user.id)
    }
    this.service.editCompany(Company).subscribe();
    setTimeout(() => {this.router.navigateByUrl('/user-account').then(() => {
      window.location.reload();
    });}, 500);
  }

  onCancel() {
    this.router.navigateByUrl('/user-account');
  }

}
