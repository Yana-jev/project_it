import { Component, OnInit } from '@angular/core';
import { Wine } from '../../data/services/interfaces/wine';
import { CartService } from '../../data/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: Wine[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  removeItem(item: Wine) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}