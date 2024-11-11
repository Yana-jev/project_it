import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { QuizQuestion } from '../../data/services/interfaces/iquiz';
import { Wine } from '../../data/services/interfaces/wine';
import { questions } from './quiz-preguntas';
import { CommonModule } from '@angular/common';
import { WineService } from '../../data/services/wine.service';
import { CartService } from '../../data/services/cart.service';

@Component({
  selector: 'quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  questions: QuizQuestion[] = questions;
  currentQuestionIndex = 0;
  selectedAnswers: number[] = [];
  recommendedWines: Wine[] | undefined = []; 
  cartService = inject(CartService);

  constructor(private wineService: WineService, private cdRef: ChangeDetectorRef) {}

  selectAnswer(score: number) {
    this.selectedAnswers[this.currentQuestionIndex] = score;
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResults();
    }
  }


  getRandomWines(wines: Wine[], count: number): Wine[] {
    const shuffled = wines.slice(); 
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled.slice(0, count); 
  }

  async showResults() {
    const totalScore = this.selectedAnswers.reduce((acc, score) => acc + score, 0);

    let criteria;
    if (totalScore <= 15) {
      criteria = { type: 'Tinto', sugar: 'dry' };
    } else if (totalScore <= 25) {
      criteria = { type: 'Blanco', sugar: 'medium' };
    } else {
      criteria = { type: 'Espumoso', sugar: 'sweet' };
    }

    this.recommendedWines = await this.wineService.getWinesByCriteria(criteria);

    this.recommendedWines = this.getRandomWines(this.recommendedWines!, 3);

    console.log("Recommended Wines:", this.recommendedWines); 
    this.cdRef.detectChanges();
  }


  addToCart(wine: Wine, quantity: number = 1): void {
    this.cartService.addItemToCart(wine.id_wine, quantity).subscribe({
      next: (response) => {
        console.log('Товар добавлен в корзину:', response);
      },
      error: (err) => {
        console.error('Ошибка при добавлении товара в корзину:', err);
      }
    });
  }
}

