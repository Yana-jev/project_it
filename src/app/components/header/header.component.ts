import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { CartService } from '../../data/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  itemCount = signal(0);
  isMenuOpen = false;

  constructor(private cartService: CartService) {
    this.updateItemCount();

    this.cartService.cartUpdates$.subscribe(() => {
      this.updateItemCount(); 
    });
  }


  private updateItemCount(): void {
    this.cartService.getTotalItems().subscribe((totalItems) => {
      this.itemCount.set(totalItems);
    });
  }


  onLogout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed', error);
        alert('Logout failed: ' + error.error.message || 'Unknown error');
      }
    );
  }
}

