import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { CartService } from '../../data/services/cart.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  itemCount = signal(0);
  isMenuOpen = false;
  translate = inject(TranslateService)
  currentLang = this.translate.currentLang || 'es';

  constructor(private cartService: CartService) {
    this.updateItemCount();

    this.cartService.cartUpdates$.subscribe(() => {
      this.updateItemCount(); 
    });
    this.translate.addLangs(['es', 'en', 'ru']);
    this.translate.setDefaultLang('es');
    this.translate.use(this.currentLang);
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

changeLanguage(event: Event) {
  const select = event.target as HTMLSelectElement; 
  const lang = select.value;
  this.currentLang = lang;
  this.translate.use(lang);
}
}

