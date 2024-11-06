import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { Wine } from '../../data/services/interfaces/wine';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WineService } from '../../data/services/wine.service';

@Component({
  selector: 'tienda',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, RouterOutlet, RouterLink],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})

  export class TiendaComponent {

    wines: Wine[] = [];
    filteredWines: Wine[] = [];
    uniqueProductors: string[] = [];
    selectedColor: string = '';
    selectedType: string = '';
    selectedProductor: string = '';
    selectedPrice: number = 200; 
    searchTerm: string = '';
    wineService = inject(WineService);
  
    constructor() {
      this.wineService.getWine()
        .subscribe(val => {
          console.log('Received wines:', val);
          this.wines = val;
          this.filteredWines = [...this.wines];
          this.uniqueProductors = this.getUniqueProductors();
          this.applyFilters();
        });
    }
  
    applyFilters() {
      
      this.filteredWines = this.wines.filter(wine => {
        
        const matchesColor = this.selectedColor ? wine.color === this.selectedColor : true;
        const matchesType = this.selectedType ? wine.type === this.selectedType : true;
        const matchesProductor = this.selectedProductor ? wine.bodega_name === this.selectedProductor : true;
        const matchesPrice = wine.price <= this.selectedPrice;
        const matchesSearchTerm = wine.wine_name.toLowerCase().includes(this.searchTerm.toLowerCase());
  
        return matchesColor && matchesType && matchesProductor && matchesPrice && matchesSearchTerm;
      });

    }
  
    getUniqueProductors(): string[] {
      return Array.from(new Set(this.wines
        .map(wine => wine.bodega_name)
        .filter((productor): productor is string => productor !== undefined)
      ));
    }
  

  
    addToCart(wine: Wine) {
      console.log(`${wine.wine_name} ha sido añadido al carrito.`);
    }

    
}


