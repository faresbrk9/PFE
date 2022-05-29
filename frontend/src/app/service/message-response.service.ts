import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageResponseService {

readonly url="http://localhost:5025/api/publicMessageResponse";

constructor(private http: HttpClient) { }

getResponsesByMessage(id:any):Observable<any[]> {
  return this.http.get<any>(this.url + `/${id}`);
}

sendResponse(data:any) {
  return this.http.post(`${this.url}/sendResponse`, data);
}

deleteResponse(id:any) {
  return this.http.delete(this.url + `/${id}`);
}

getNotifications(userId:any):Observable<any[]> {
  return this.http.get<any>(`${this.url}/notifications` + `/${userId}`);
}

getUnreadResponsesCount(messageId:any):Observable<any[]> {
  return this.http.get<any>(`${this.url}/unreadResponsesCount` + `/${messageId}`);
}

turnRead(id:any):Observable<any[]> {
  return this.http.get<any>(`${this.url}/turnRead` + `/${id}`);
}

}
