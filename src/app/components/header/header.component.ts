import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { CartService } from '../../data/services/cart.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  itemCount = signal(0);

  constructor(private cartService: CartService) {

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

