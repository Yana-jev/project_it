// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, map, Observable, tap } from 'rxjs';
// import { CartItem } from './interfaces/icartitem'; 

// @Injectable({
// providedIn: 'root',
// })

// export class CartService {
// private apiUrl = 'http://localhost:3000/carts'; 

// private cartUpdateSubject = new BehaviorSubject<void>(undefined);
// cartUpdates$ = this.cartUpdateSubject.asObservable();


// constructor(private http: HttpClient) {}

// getCart(): Observable<CartItem[]> {
//    return this.http.get<CartItem[]>(this.apiUrl, {
//       withCredentials: true, 
//    });
// }


// createCart(): Observable<any> {
//    return this.http.post<any>(this.apiUrl, {}, {
//       withCredentials: true, 
//    });
// }

// getTotalItems(): Observable<number> {
//    return this.http.get<{totalItems: number}>(`${this.apiUrl}/total`, {withCredentials: true,

//    }).pipe(map(response=>response.totalItems));
// }

// addItemToCart(wineId: number, quantity: number): Observable<CartItem> {
//    return this.http.post<CartItem>(`${this.apiUrl}/add`, { wineId, quantity }, { withCredentials: true })
//       .pipe(
//          tap(() => this.cartUpdateSubject.next()) 
//       );
//    }

//    updateCartItemQuantity(wineId: number, quantity: number): Observable<CartItem> {
//    return this.http.patch<CartItem>(`${this.apiUrl}/update`, { wineId, quantity }, { withCredentials: true })
//       .pipe(
//          tap(() => this.cartUpdateSubject.next()) 
//       );
//    }

//    removeItemFromCart(wineId: number): Observable<void> {
//    return this.http.delete<void>(`${this.apiUrl}/remove/${wineId}`, { withCredentials: true })
//       .pipe(
//          tap(() => this.cartUpdateSubject.next()) 
//       );
//    }

//    clearCart(): Observable<void> {
//    return this.http.delete<void>(`${this.apiUrl}/clear`, { withCredentials: true })
//       .pipe(
//          tap(() => this.cartUpdateSubject.next()) 
//       );
//    }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from './interfaces/icartitem';
import { Wine } from './interfaces/wine'; 
import { map } from 'rxjs/operators';
import { signal } from '@angular/core';

@Injectable({
providedIn: 'root',
})
export class CartService {
private apiUrl = 'http://localhost:3000/carts';

private cartUpdateSubject = new BehaviorSubject<void>(undefined);
cartUpdates$ = this.cartUpdateSubject.asObservable();

cartItems = signal<CartItem[]>([]);
private guestCart: CartItem[] = [];
private guestCartTimeout: any;

constructor(private http: HttpClient) {
   this.loadGuestCartFromStorage();
}


private saveGuestCartToStorage(): void {
   localStorage.setItem('guestCart', JSON.stringify(this.guestCart));
   }
   private loadGuestCartFromStorage(): void {
   const data = localStorage.getItem('guestCart');
   this.guestCart = data ? JSON.parse(data) : [];
   this.cartUpdateSubject.next();
   }

   getCart(loggedIn: boolean): Observable<CartItem[]> {
   if (loggedIn) {
      return this.http.get<CartItem[]>(this.apiUrl, { withCredentials: true }).pipe(
         tap(items => this.cartItems.set(items))
      );
   } else {
      return of(this.guestCart);
   }
   }


getTotalItems(loggedIn: boolean): Observable<number> {
   if (loggedIn) {
   return this.http
      .get<{ totalItems: number }>(`${this.apiUrl}/total`, { withCredentials: true })
      .pipe(map(res => res.totalItems));
   } else {
   return of(this.guestCart.reduce((sum, item) => sum + item.quantity, 0));
   }
}

addItemToCart(wine: Wine, quantity: number, loggedIn: boolean): Observable<CartItem> {
   if (loggedIn) {

   return this.http
      .post<CartItem>(
         `${this.apiUrl}/add`,
         { wineId: wine.id_wine, quantity },
         { withCredentials: true }
      )
      .pipe(tap(() => this.cartUpdateSubject.next()));
   } else {

   const existing = this.guestCart.find(i => i.wineId === wine.id_wine);
   if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = existing.price * existing.quantity;
   } else {
      this.guestCart.push({
         wineId: wine.id_wine,
         wineName: wine.wine_name,
         price: wine.price,
         quantity,
         totalPrice: wine.price * quantity,
         imageUrl: wine.image_url
      });
   }
   this.saveGuestCartToStorage(); 
   this.cartUpdateSubject.next();


   if (this.guestCartTimeout) clearTimeout(this.guestCartTimeout);
   this.guestCartTimeout = setTimeout(() => this.clearGuestCart(), 1000 * 60 * 60);

   return of(existing || this.guestCart[this.guestCart.length - 1]);
   }
}


private clearGuestCart(): void {
   this.guestCart = [];
   this.cartUpdateSubject.next();
}

updateCartItemQuantity(wineId: number, quantity: number, loggedIn: boolean): void {
   if (loggedIn) {
   this.http
      .patch<CartItem>(`${this.apiUrl}/update`, { wineId, quantity }, { withCredentials: true })
      .subscribe({
         next: () => this.cartUpdateSubject.next(),
         error: err => console.error('Error updating item quantity:', err)
      });
   } else {
   const item = this.guestCart.find(i => i.wineId === wineId);
   if (item) {
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
      this.cartUpdateSubject.next();
   }
   }
}


removeItemFromCart(wineId: number, loggedIn: boolean): void {
   if (loggedIn) {
   this.http.delete<void>(`${this.apiUrl}/remove/${wineId}`, { withCredentials: true }).subscribe({
      next: () => this.cartUpdateSubject.next(),
      error: err => console.error('Error removing item:', err)
   });
   } else {
   this.guestCart = this.guestCart.filter(i => i.wineId !== wineId);
   this.cartUpdateSubject.next();
   }
}


clearCart(loggedIn: boolean): void {
   if (loggedIn) {
   this.http.delete<void>(`${this.apiUrl}/clear`, { withCredentials: true }).subscribe({
      next: () => this.cartUpdateSubject.next(),
      error: err => console.error('Error clearing cart:', err)
   });
   } else {
   this.clearGuestCart();
   }
}

mergeGuestCartWithServer(): Observable<CartItem[]> {
   if (!this.guestCart.length) return of([]);

   return this.http.post<CartItem[]>(
      `${this.apiUrl}/merge`,
      { items: this.guestCart.map(i => ({ wineId: i.wineId, quantity: i.quantity })) },
      { withCredentials: true }
   ).pipe(
      tap((mergedItems) => {
         this.cartItems.set(mergedItems);   // обновляем сигнал
         this.guestCart = [];               // очищаем локальный массив
         localStorage.removeItem('guestCart'); // очищаем localStorage
         this.cartUpdateSubject.next();     // уведомляем подписчиков
      })
   );
   }

}
