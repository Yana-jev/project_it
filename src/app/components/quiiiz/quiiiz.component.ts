import { Component, inject, OnInit } from '@angular/core';
import { WineService } from '../../data/services/wine.service'; 
import { Wine, WineFilterCriteria } from '../../data/services/interfaces/wine'; 

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../data/services/cart.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiiiz.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./quiiiz.component.scss']
})

export class QuiizComponent {
  questions = [
    {
      question: '¿Qué tipo de vino prefieres?',
      options: ['Tinto', 'Blanco', 'Espumoso'],
      key: 'colorOrType',
      imageUrl: 'assets/img/v1.jpg'
    },
    {
      question: '¿Con qué plato vas a acompañar el vino?',
      options: [],
      key: 'maridaje',
      imageUrl: 'assets/img/v10.jpg'
    },
    {
      question: '¿Qué aromas te gustan?',
      options: [],
      key: 'aroma',
      imageUrl: 'assets/img/v7.jpg'
    },
    {
      question: '¿En qué rango de precio estás buscando el vino?',
      options: ['menos de 15 euros', '15-20 euros', 'más de 20 euros'],
      key: 'price',
      imageUrl: 'assets/img/v8.jpg'
    },
  ];
  
  currentQuestionIndex = 0;
  userAnswers: any = {};
  recommendations: Wine[] | null = null;
  cartService = inject(CartService);

  constructor(private quizService: WineService, private router: Router) {}

  handleOptionSelect(option: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.userAnswers[currentQuestion.key] = option;
  

    if (currentQuestion.key === 'colorOrType') {
      if (option === 'Tinto') {
        this.userAnswers.color = 'tinto';
        this.userAnswers.type = '';
        this.questions[1].options = ['carne', 'pasta', 'aperitivo'];
        this.questions[2].options = ['madera', 'especias', 'frutos maduros'];
      } else if (option === 'Blanco') {
        this.userAnswers.color = 'blanco';
        this.userAnswers.type = '';
        this.questions[1].options = ['pescados y mariscos', 'aperitivos', 'carnes'];
        this.questions[2].options = ['frutas', 'floral', 'hierbas'];
        this.questions[0].options = ['Tinto', 'Blanco']; // Убираем Espumoso
      } else if (option === 'Espumoso') {
        this.userAnswers.type = 'espumoso';
        this.userAnswers.color = '';
        this.questions[1].options = ['pescados y mariscos', 'aperitivos', 'carnes'];
        this.questions[2].options = ['frutas', 'floral', 'bollería'];
      }
    }
  
    this.currentQuestionIndex++;
  

    if (this.currentQuestionIndex === this.questions.length) {
      this.fetchResults();
    }
  }
  
  fetchResults() {
    const queryParams: any = {
      color: this.userAnswers.color,
      type: this.userAnswers.type,
      maridaje: this.userAnswers.maridaje,
      aroma: this.userAnswers.aroma,
    };
  

    if (this.userAnswers.price === 'menos de 15 euros') {
      queryParams.price = '0-15';
    } else if (this.userAnswers.price === '15-20 euros') {
      queryParams.price = '15-20';
    } else if (this.userAnswers.price === 'más de 20 euros') {
      queryParams.price = '20-';
    }
  

    if (queryParams.color && queryParams.type) {
      if (queryParams.color === 'blanco' || queryParams.color === 'tinto') {
        delete queryParams.type;
      }
    }
  

  
    this.quizService.filterWines(queryParams).subscribe(
      (data: Wine[]) => {
        this.recommendations = data;
      },
      (error) => {
        console.error('Error al obtener recomendaciones:', error);
      }
    );
  }
  
  addToCart(wine: Wine, quantity: number = 1): void {
    this.cartService.addItemToCart(wine.id_wine, quantity).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
      },
      error: (err) => {
        console.error('Error of adding to cart:', err);
      }
    });
  }
  goToWineDetail(wineId: number){
    this.router.navigate([`/wine/${wineId}`]);  
  }
  goBack() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      if (this.currentQuestionIndex === 0) {
        this.questions[0].options = ['Tinto', 'Blanco', 'Espumoso'];
      }
    }
  }
  
  

}
