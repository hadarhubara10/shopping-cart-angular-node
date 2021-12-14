import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private serverURL = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get<any>(this.serverURL);
  }
  getUser(id: any): Observable<any> {
    return this.http.get<any>(`${this.serverURL}${id}`);
  }
  createUser(body): Observable<any> {
    return this.http.post<any>(this.serverURL, body);
  }
  createOrder(userID, productsCartID): Observable<any> {
    return this.http.post<any>('http://localhost:3000/order', {
      userID,
      productsCartID,
    });
  }
}
