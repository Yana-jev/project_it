// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { CartService } from '../../data/services/cart.service';  
// import { CartItem } from '../../data/services/interfaces/icartitem';  

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.scss'],
// })
// export class CartComponent implements OnInit {

// cartItems = signal<CartItem[]>([]);

// constructor(private cartService: CartService){}

// ngOnInit(): void {
//   this.loadCart()
// }

// get cartItemsValue(): CartItem[] {
//   return this.cartItems();
// }

// loadCart(): void {
//   this.cartService.getCart().subscribe((items)=>{
//     this.cartItems.set(items);
//   });
// }

// updateQuantity(item: CartItem, newQuantity: number): void {
//   if (newQuantity < 1) {
//     this.removeItemFromCart(item);
//     return;
//   }

//   this.cartService.updateCartItemQuantity(item.wineId, newQuantity).subscribe(
//     () => {
//       this.loadCart(); 
//     },
//     (error) => {
//       console.error('Error updating item quantity:', error);
//     }
//   );
// }


// calculateTotalCost(): number{
//   return this.cartItems().reduce((total, item)=>{
//     return total + item.price * item.quantity;
//   }, 0);

// }

// removeItemFromCart(item: CartItem): void {
//   this.cartService.removeItemFromCart(item.wineId).subscribe(() => {

//     this.cartItems.update((cartItems) => cartItems.filter((i) => i.wineId !== item.wineId));
//   });
// }

// calculateTotalPrice(item: CartItem): number {
//   return item.price * item.quantity;
// }

// }
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../data/services/cart.service';
import { CartItem } from '../../data/services/interfaces/icartitem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

cartItems = this.cartService.cartItems;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();

    this.cartService.cartUpdates$.subscribe(() => this.loadCart());
  }

  get cartItemsValue(): CartItem[] {
    return this.cartItems();
  }

  private isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  loadCart(): void {
    const loggedIn = this.isLoggedIn();
    this.cartService.getCart(loggedIn).subscribe((items) => {
      this.cartItems.set(items);
    });
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    const loggedIn = this.isLoggedIn();

    if (newQuantity < 1) {
      this.removeItemFromCart(item);
      return;
    }

    this.cartService.updateCartItemQuantity(item.wineId, newQuantity, loggedIn);
  }

  removeItemFromCart(item: CartItem): void {
    const loggedIn = this.isLoggedIn();
    this.cartService.removeItemFromCart(item.wineId, loggedIn);
  }

  clearCart(): void {
    const loggedIn = this.isLoggedIn();
    this.cartService.clearCart(loggedIn);
  }

  calculateTotalPrice(item: CartItem): number {
    return item.price * item.quantity;
  }

  calculateTotalCost(): number {
    return this.cartItems().reduce((total, item) => total + this.calculateTotalPrice(item), 0);
  }
}
