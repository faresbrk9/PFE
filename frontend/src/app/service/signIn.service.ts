import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

readonly url="http://localhost:5025/api/user";
readonly url2="http://localhost:5025/api/company";


constructor(private http: HttpClient) { }

getUsers():Observable<any[]> {
  return this.http.get<any>(this.url);
}

addUser(data:any) {
  return this.http.post(this.url, data);
}

deleteUser(id:number|string) {
  return this.http.delete(this.url + `/${id}`);
}

login(data:any) {
  return this.http.post(`${this.url}/login`, data);
}

getCompanies():Observable<any[]> {
  return this.http.get<any>(this.url2);
}

getCompanyByOwner(ownerId:number|string):Observable<any[]> {
  return this.http.get<any>(this.url2 + `/${ownerId}`);
}

}
