import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  cartItems: CartItem[] = [];  

  cartService = inject(CartService);

  constructor() {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        console.log('Полученные данные корзины:', response); 
        this.cartItems = response;
      },
      error: (err) => {
        console.error('Ошибка при получении товаров из корзины:', err);
      },
    });
  }
  


  calculateTotalPrice(item: CartItem): number {
    return item.totalPrice;
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      newQuantity = 1; 
    }
    this.cartService.updateCartItemQuantity(item.wineId, newQuantity).subscribe({
      next: (updatedItem) => {
        item.quantity = updatedItem.quantity;  
        item.totalPrice = updatedItem.totalPrice;  
      },
      error: (err) => {
        console.error('Error of update:', err);
      },
    });
  }

  removeItemFromCart(item: CartItem): void {
    this.cartService.removeItemFromCart(item.wineId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.wineId !== item.wineId);  
      },
      error: (err) => {
        console.error('error of delete cart:', err);
      },
    });
  }
  
}
