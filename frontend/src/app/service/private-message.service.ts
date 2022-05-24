import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
