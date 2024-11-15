import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartItem } from './interfaces/icartitem'; 

@Injectable({
providedIn: 'root',
})

export class CartService {
private apiUrl = 'http://localhost:3000/carts'; 

private cartUpdateSubject = new BehaviorSubject<void>(undefined);
cartUpdates$ = this.cartUpdateSubject.asObservable();


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

getTotalItems(): Observable<number> {
   return this.http.get<{totalItems: number}>(`${this.apiUrl}/total`, {withCredentials: true,

   }).pipe(map(response=>response.totalItems));
}

addItemToCart(wineId: number, quantity: number): Observable<CartItem> {
   return this.http.post<CartItem>(`${this.apiUrl}/add`, { wineId, quantity }, { withCredentials: true })
      .pipe(
         tap(() => this.cartUpdateSubject.next()) 
      );
   }

   updateCartItemQuantity(wineId: number, quantity: number): Observable<CartItem> {
   return this.http.patch<CartItem>(`${this.apiUrl}/update`, { wineId, quantity }, { withCredentials: true })
      .pipe(
         tap(() => this.cartUpdateSubject.next()) 
      );
   }

   removeItemFromCart(wineId: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/remove/${wineId}`, { withCredentials: true })
      .pipe(
         tap(() => this.cartUpdateSubject.next()) 
      );
   }

   clearCart(): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/clear`, { withCredentials: true })
      .pipe(
         tap(() => this.cartUpdateSubject.next()) 
      );
   }

}