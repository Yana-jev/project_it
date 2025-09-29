import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { Wine } from '../../data/services/interfaces/wine';
import { FormsModule } from '@angular/forms';
import { WineService } from '../../data/services/wine.service';
import { CartService } from '../../data/services/cart.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'tienda',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})

  export class TiendaComponent {

    wines: Wine[] = [];
    selectedWine: Wine | null = null;
    filteredWines: Wine[] = [];
    uniqueProductors: string[] = [];
    selectedColor: string = '';
    selectedType: string = '';
    selectedProductor: string = '';
    selectedPrice: number = 50; 
    searchTerm: string = '';
    priceSortOrder: string = '';
    wineService = inject(WineService);
    cartService = inject(CartService);
    showPopup: boolean = false;
    popupMessage: string = '';
    showMobileFilters = false;

    constructor(private router: Router) {
      this.wineService.getWine()
        .subscribe(val => {
          console.log('Received wines:', val);
          this.wines = val;
          this.filteredWines = [...this.wines];
          this.uniqueProductors = this.getUniqueProductors();
          this.applyFilters();
        });
    }

toggleMobileFilters() {
  this.showMobileFilters = !this.showMobileFilters;
}
    applyFilters() {
      this.filteredWines = this.wines
        .filter((wine: Wine) => {
          const matchesColor = this.selectedColor ? wine.color === this.selectedColor : true;
          const matchesType = this.selectedType ? wine.type === this.selectedType : true;
          const matchesProductor = this.selectedProductor ? wine.bodega_name === this.selectedProductor : true;
          const matchesPrice = wine.price <= this.selectedPrice;
          const matchesSearchTerm = wine.wine_name.toLowerCase().includes(this.searchTerm.toLowerCase());
    
          return matchesColor && matchesType && matchesProductor && matchesPrice && matchesSearchTerm;
        })
        .sort((a: Wine, b: Wine) => {
          if (this.priceSortOrder === 'asc') {
            return a.price - b.price;
          } else if (this.priceSortOrder === 'desc') {
            return b.price - a.price;
          }
          return 0; 
        });
    }
    
  
    getUniqueProductors(): string[] {
      return Array.from(new Set(this.wines
        .map(wine => wine.bodega_name)
        .filter((productor): productor is string => productor !== undefined)
      ));
    }


addToCart(wine: Wine, quantity: number = 1): void {
  const loggedIn = !!localStorage.getItem('token'); // проверка авторизации

  this.cartService.addItemToCart(wine, quantity, loggedIn).subscribe({
    next: (response) => {
      console.log('Added to cart:', response);
      this.showSuccessPopup('Producto agregado exitosamente');
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}


    goToWineDetail(wineId: number){
      this.router.navigate([`/wine/${wineId}`]);  
    }


    showSuccessPopup(message: string): void {
      this.popupMessage = message;
      this.showPopup = true;
      setTimeout(() => {
          this.showPopup = false;
          this.popupMessage = '';
      }, 1000);
  }
}


