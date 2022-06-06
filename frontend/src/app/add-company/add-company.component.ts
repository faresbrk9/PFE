import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company';
import { SignInService } from '../service/signIn.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  getUser = localStorage.getItem('userInfo');
  user = JSON.parse(this.getUser);

  companyInfo = new Company('','','','','','','','','','','','','','')

  companyFound:boolean = false;
  companyAddSuccess:boolean = false;

  constructor(private service: SignInService,
    private router: Router) { }

  ngOnInit() {
  }

  addCompany(){
    var Company = {
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
    this.service.addCompany(Company).subscribe((data:any) => {
      if (data.statusCode == 401)
      {
        this.companyFound = true;
      }

      else if (data.statusCode == 404)
      {
        this.companyFound = false;
        this.companyAddSuccess = true;
        setTimeout(() => {this.router.navigateByUrl('/user-account');
        }, 1000);
      }

      else
      {
        this.companyFound = false;
        this.companyAddSuccess = false;
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/user-account');
  }

}
