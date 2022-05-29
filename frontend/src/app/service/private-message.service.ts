import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivateMessageService {

readonly url="http://localhost:5025/api/privateMessage";

constructor(private http: HttpClient) { }

getPrivateMessages(data:any) {
  return this.http.post(`${this.url}/loadMessages`, data);
}

sendPrivateMessage(data:any) {
  return this.http.post(`${this.url}/sendPrivateMessage`, data);
}

deleteMessage(id:any) {
  return this.http.delete(this.url + `/${id}`);
}

getNotifications(id:any):Observable<any[]> {
  return this.http.get<any>(`${this.url}/notifications` + `/${id}`);
}

}
