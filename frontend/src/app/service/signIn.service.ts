import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

readonly url1="http://localhost:5025/api/user";
readonly url2="http://localhost:5025/api/company";


constructor(private http: HttpClient) { }

getUsers():Observable<any[]> {
  return this.http.get<any>(this.url1);
}

addUser(data:any) {
  return this.http.post(this.url1, data);
}

declineUser(id:any) {
  return this.http.delete(this.url1 + `/${id}`);
}

acceptUser(id:any) {
  return this.http.post(`${this.url1}/acceptInscription`, id);
}

login(data:any) {
  return this.http.post(`${this.url1}/login`, data);
}

editUser(data:any) {
  return this.http.post(`${this.url1}/editUser`, data);
}

getCompanies():Observable<any[]> {
  return this.http.get<any>(this.url2);
}

getCompanyByOwner(ownerId:number|string):Observable<any[]> {
  return this.http.get<any>(this.url2 + `/${ownerId}`);
}

addCompany(data:any) {
  return this.http.post(`${this.url2}/addCompany`, data);
}

editCompany(data:any) {
  return this.http.post(`${this.url2}/editCompany`, data);
}

}
