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
    wineService = inject(WineService)
  
    filteredWines: Wine[] = [...this.wines]; 
    uniqueProductors: string[] = this.getUniqueProductors(); 
    uniqueYears: string[] = this.getUniqueYears(); 
    selectedColor: string = '';
    selectedType: string = '';
    selectedProductor: string = '';
    selectedYear: string = '';
    selectedPrice: number = 500; 
    searchTerm: string = '';
  

    applyFilters() {
      this.filteredWines = this.wines.filter(wine => {
        const matchesColor = this.selectedColor ? wine.color === this.selectedColor : true;
        const matchesType = this.selectedType ? wine.type === this.selectedType : true;
        const matchesProductor = this.selectedProductor ? wine.bodega_name === this.selectedProductor : true;
        const matchesYear = this.selectedYear ? wine.year === this.selectedYear : true;
        const matchesPrice = wine.price <= this.selectedPrice;
        const matchesSearchTerm = wine.wine_name.toLowerCase().includes(this.searchTerm.toLowerCase());
  
        return matchesColor && matchesType && matchesProductor && matchesYear && matchesPrice && matchesSearchTerm;
      });
    }
  

    getUniqueProductors(): string[] {
      return Array.from(new Set(this.wines
        .map(wine => wine.bodega_name) 
        .filter((productor): productor is string => productor !== undefined)
      ));
    }
  

    getUniqueYears(): string[] {
      return Array.from(new Set(this.wines
        .map(wine => wine.year) 
        .filter((year): year is string => year !== undefined) 
      ));
    }
  

    addToCart(wine: Wine) {

      console.log(`${wine.wine_name} ha sido añadido al carrito.`);

    }

    constructor(){
      this.wineService.getWine()
      .subscribe(val =>{
        console.log('Received events:', val);
        this.wines = val
      })
    }
}
