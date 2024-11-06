import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './interfaces/icartitem';  

@Injectable({
providedIn: 'root',
})
export class CartItemService {
private baseApiUrl = 'http://localhost:3000/cart-items'; 

constructor(private http: HttpClient) {}

getCartItems(cartId: number): Observable<CartItem[]> {
   return this.http.get<CartItem[]>(`${this.baseApiUrl}/cart/${cartId}`);
}

addCartItem(cartId: number, cartItemData: CartItem): Observable<CartItem> {
   return this.http.post<CartItem>(`${this.baseApiUrl}/cart/${cartId}`, cartItemData);
}
updateCartItem(cartId: number, cartItemId: number, cartItemData: CartItem): Observable<CartItem> {
   return this.http.patch<CartItem>(`${this.baseApiUrl}/cart/${cartId}/item/${cartItemId}`, cartItemData);
}

deleteCartItem(cartId: number, cartItemId: number): Observable<void> {
   return this.http.delete<void>(`${this.baseApiUrl}/cart/${cartId}/item/${cartItemId}`);
}
}
