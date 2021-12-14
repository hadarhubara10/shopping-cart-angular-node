import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private serverURL = 'http://localhost:3000/product/';
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<any> {
    return this.http.get<any>(this.serverURL);
  }
  getAllCart(): Observable<any> {
    return this.http.get<any>(this.serverURL + 'cart');
  }
  getProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.serverURL}${id}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.serverURL + id);
  }

  createProductCart(id: any): Observable<any> {
    return this.http.post<any>(this.serverURL + id, {});
  }

  patchProduct(id: string, add: boolean): Observable<any> {
    return this.http.patch<any>(this.serverURL + id, { add: add });
  }
  deleteAllCart() {
    return this.http.delete<any>(this.serverURL + 'cart/del');
  }
}
