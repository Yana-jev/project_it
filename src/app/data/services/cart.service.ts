import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './interfaces/icartitem'; 

@Injectable({
providedIn: 'root',
})

export class CartService {
   private apiUrl = 'http://localhost:3000/carts'; 
   
   constructor(private http: HttpClient) {}

   getCart(): Observable<CartItem[]> {
      return this.http.get<CartItem[]>(this.apiUrl, {
         withCredentials: true, 
      });
   }
   

   createCart(): Observable<any> {
      return this.http.post<any>(this.apiUrl, {}, {
         withCredentials: true, 
      });
   }
   

   addItemToCart(wineId: number, quantity: number): Observable<CartItem> {
      return this.http.post<CartItem>(`${this.apiUrl}/add`, { wineId, quantity }, {
         withCredentials: true, 
      });
   }

   updateCartItemQuantity(wineId: number, quantity: number): Observable<CartItem> {
      return this.http.patch<CartItem>(`${this.apiUrl}/update`, { wineId, quantity }, {
         withCredentials: true, 
      });
   }
   
   removeItemFromCart(wineId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/remove/${wineId}`, {
         withCredentials: true,
      });
   }


   clearCart(): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/clear`, {
         withCredentials: true, 
      });
   }
   }