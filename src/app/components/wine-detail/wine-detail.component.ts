import { Component, inject, Pipe } from '@angular/core';
import { Wine } from '../../data/services/interfaces/wine';
import { WineService } from '../../data/services/wine.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../data/services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';




@Component({
  selector: 'wine-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './wine-detail.component.html',
  styleUrl: './wine-detail.component.scss'
})
export class WineDetailComponent {
  wines: Wine[] = [];
  wine: Wine | null = null; 
  wineService = inject(WineService);
  route = inject(ActivatedRoute);
  bgPosition = 'center'; 
  bgSize = 'cover'; 
  cartService = inject(CartService);
  private langSub: Subscription;
  translateService = inject(TranslateService);

  constructor(private router: Router) {
    this.loadWine();
        this.langSub = this.translateService.onLangChange.subscribe(() => {
      this.loadWine(); // перезапрашиваем данные с новым lang
    });
  }


  private loadWine(): void {
    const wineId = this.route.snapshot.paramMap.get('id'); 
    if (wineId) {
      this.wineService.getWineById(wineId).subscribe({
        next: (response: any) => {

          this.wine = response.data; 
        },
        error: (err) => {
          console.error('Ошибка загрузки вина:', err);
        }
      });
    }
  }
  // addToCart(wine: Wine, quantity: number = 1): void {
  //   this.cartService.addItemToCart(wine.id_wine, quantity).subscribe({
  //     next: (response) => {
  //       console.log('Added to cart:', response);
  //     },
  //     error: (err) => {
  //       console.error('Error of adding to cart:', err);
  //     }
  //   });
  // }

addToCart(wine: Wine, quantity: number = 1): void {
  const loggedIn = !!localStorage.getItem('token'); // проверяем, авторизован ли пользователь

  this.cartService.addItemToCart(wine, quantity, loggedIn).subscribe({
    next: (response) => {
      console.log('Added to cart:', response);
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}



  goToWineDetail(wineId: number){
    this.router.navigate([`/wine/${wineId}`]);  
  }
    ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
  
}



