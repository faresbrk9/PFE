import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicMessageService {

readonly url="http://localhost:5025/api/publicMessage";

constructor(private http: HttpClient) { }

getPublishedMessages():Observable<any[]> {
  return this.http.get<any>(`${this.url}/publishedMessages`);
}

sendPublicMessage(data:any) {
  return this.http.post(`${this.url}/sendMessage`, data);
}

deleteMessage(id:any) {
  return this.http.delete(this.url + `/${id}`);
}

getUserMessages(userId:any):Observable<any[]> {
  return this.http.get<any>(this.url + `/${userId}`);
}

}
