import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Wine } from '../../data/services/interfaces/wine';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})

  export class TiendaComponent {

    wines: Wine[] = [
      {
        name: 'Bouquet',
        productor: 'Productor A',
        variedad: 'Roura',
        year: '2020',
        cantidad: 10,
        aroma: 'Aroma A',
        maridaje: 'Maridaje A',
        price: 15,
        color: 'Tinto',
        type: 'Tranquilo',
        sugar: 'Seco',
        image: '/assets/img/vinos/01.jpg',
        description: 'Descripción del vino A',
        volumen: '750ml'
      },
      {
        name: 'Espectacle',
        productor: 'Celler can roda',
        variedad: 'Variedad B',
        year: '2021',
        cantidad: 5,
        aroma: 'Aroma B',
        maridaje: 'Maridaje B',
        price: 20,
        color: 'Blanco',
        type: 'Espumoso',
        sugar: 'Dulce',
        image: '/assets/img/vinos/02.jpg',
        description: 'Descripción del vino B',
        volumen: '750ml'
      },
      {
        name: 'Pansa blanca',
        productor: 'Marfil',
        variedad: 'Variedad B',
        year: '2021',
        cantidad: 5,
        aroma: 'Aroma B',
        maridaje: 'Maridaje B',
        price: 10,
        color: 'Blanco',
        type: 'Espumoso',
        sugar: 'Seco',
        image: '/assets/img/vinos/03.jpg',
        description: 'Descripción del vino B',
        volumen: '750ml'
      },
      {
        name: 'SO',
        productor: 'Bouquet',
        variedad: 'Variedad B',
        year: '2021',
        cantidad: 5,
        aroma: 'Aroma B',
        maridaje: 'Maridaje B',
        price: 20,
        color: 'Blanco',
        type: 'Espumoso',
        sugar: 'Dulce',
        image: '/assets/img/vinos/02.jpg',
        description: 'Descripción del vino B',
        volumen: '750ml'
      },
      {
        name: 'La viña',
        productor: 'Alta alella',
        variedad: 'Variedad B',
        year: '2021',
        cantidad: 5,
        aroma: 'Aroma B',
        maridaje: 'Maridaje B',
        price: 20,
        color: 'Blanco',
        type: 'Espumoso',
        sugar: 'Seco',
        image: '/assets/img/vinos/03.jpg',
        description: 'Descripción del vino B',
        volumen: '750ml'
      },
      {
        name: '12@',
        productor: 'Bouquet',
        variedad: 'Variedad B',
        year: '2021',
        cantidad: 5,
        aroma: 'Aroma B',
        maridaje: 'Maridaje B',
        price: 20,
        color: 'Blanco',
        type: 'Espumoso',
        sugar: 'Dulce',
        image: '/assets/img/vinos/02.jpg',
        description: 'Descripción del vino B',
        volumen: '750ml'
      },
    ];
  
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
        const matchesProductor = this.selectedProductor ? wine.productor === this.selectedProductor : true;
        const matchesYear = this.selectedYear ? wine.year === this.selectedYear : true;
        const matchesPrice = wine.price <= this.selectedPrice;
        const matchesSearchTerm = wine.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  
        return matchesColor && matchesType && matchesProductor && matchesYear && matchesPrice && matchesSearchTerm;
      });
    }
  

    getUniqueProductors(): string[] {
      return Array.from(new Set(this.wines
        .map(wine => wine.productor) 
        .filter((productor): productor is string => productor !== undefined)
      ));
    }
  

    getUniqueYears(): string[] {
      return Array.from(new Set(this.wines
        .map(wine => wine.year) // Получаем массив годов
        .filter((year): year is string => year !== undefined) 
      ));
    }
  

    addToCart(wine: Wine) {
      // Логика добавления вина в корзину (например, обновление сервиса корзины)
      console.log(`${wine.name} ha sido añadido al carrito.`);
      // Здесь можно вызвать сервис для добавления товара в корзину
    }
}
