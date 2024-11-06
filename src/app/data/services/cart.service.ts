import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wine } from '../../data/services/interfaces/wine'; 

@Injectable({
providedIn: 'root'
})
export class CartService {
private cartItems = new BehaviorSubject<Wine[]>([]);


cartItems$ = this.cartItems.asObservable();


addToCart(item: Wine) {
   const currentItems = this.cartItems.getValue();
   this.cartItems.next([...currentItems, item]);
}


removeFromCart(item: Wine) {
   const updatedItems = this.cartItems.getValue().filter(i => i !== item);
   this.cartItems.next(updatedItems);
}


clearCart() {
   this.cartItems.next([]);
}
}
