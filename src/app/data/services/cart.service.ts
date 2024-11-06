import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Cart} from './interfaces/icart';

@Injectable({
providedIn: 'root'
})

export class CartService {
   private baseApiUrl = 'http://localhost:3000/carts'; // URL для работы с корзинами

constructor(private http: HttpClient) {}

getCarts(): Observable<Cart[]> {
   return this.http.get<Cart[]>(`${this.baseApiUrl}`);
}


getCartById(cartId: number): Observable<Cart> {
   return this.http.get<Cart>(`${this.baseApiUrl}/${cartId}`);
}


addCart(cartData: Cart): Observable<Cart> {
   return this.http.post<Cart>(this.baseApiUrl, cartData);
}


updateCart(cartId: number, cartData: Cart): Observable<Cart> {
   return this.http.patch<Cart>(`${this.baseApiUrl}/${cartId}`, cartData);
}

deleteCart(cartId: number): Observable<void> {
   return this.http.delete<void>(`${this.baseApiUrl}/${cartId}`);
}
}