// import { Component, inject, OnInit } from '@angular/core';
// import { WineService } from '../../data/services/wine.service'; 
// import { Wine, WineFilterCriteria } from '../../data/services/interfaces/wine'; 
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CartService } from '../../data/services/cart.service';
// import { QUIZ_QUESTIONS, QuizQuestion } from '../../../../public/assets/quiz/quiz-question';

// @Component({
//   selector: 'app-quiz',
//   templateUrl: './quiiiz.component.html',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   styleUrls: ['./quiiiz.component.scss']
// })

// export class QuiizComponent {
//   questions = [
//     {
//       question: '¿Qué tipo de vino prefieres?',
//       options: ['Tinto', 'Blanco', 'Espumoso'],
//       key: 'colorOrType',
//       imageUrl: 'assets/img/v1.jpg'
//     },
//     {
//       question: '¿Con qué plato vas a acompañar el vino?',
//       options: [],
//       key: 'maridaje',
//       imageUrl: 'assets/img/v10.jpg'
//     },
//     {
//       question: '¿Qué aromas te gustan?',
//       options: [],
//       key: 'aroma',
//       imageUrl: 'assets/img/v7.jpg'
//     },
//     {
//       question: '¿En qué rango de precio estás buscando el vino?',
//       options: ['menos de 15 euros', '15-20 euros', 'más de 20 euros'],
//       key: 'price',
//       imageUrl: 'assets/img/v8.jpg'
//     },
//   ];
  
//   currentQuestionIndex = 0;
//   userAnswers: any = {};
//   recommendations: Wine[] | null = null;
//   cartService = inject(CartService);

//   constructor(private quizService: WineService, private router: Router) {}

//   handleOptionSelect(option: string) {
//     const currentQuestion = this.questions[this.currentQuestionIndex];
//     this.userAnswers[currentQuestion.key] = option;
  

//     if (currentQuestion.key === 'colorOrType') {
//       if (option === 'Tinto') {
//         this.userAnswers.color = 'tinto';
//         this.userAnswers.type = '';
//         this.questions[1].options = ['carne', 'pasta', 'aperitivo'];
//         this.questions[2].options = ['madera', 'especias', 'frutos maduros'];
//       } else if (option === 'Blanco') {
//         this.userAnswers.color = 'blanco';
//         this.userAnswers.type = '';
//         this.questions[1].options = ['pescados y mariscos', 'aperitivos', 'carnes'];
//         this.questions[2].options = ['frutas', 'floral', 'hierbas'];
//         this.questions[0].options = ['Tinto', 'Blanco']; // Убираем Espumoso
//       } else if (option === 'Espumoso') {
//         this.userAnswers.type = 'espumoso';
//         this.userAnswers.color = '';
//         this.questions[1].options = ['pescados y mariscos', 'aperitivos', 'carnes'];
//         this.questions[2].options = ['frutas', 'floral', 'bollería'];
//       }
//     }
  
//     this.currentQuestionIndex++;
  

//     if (this.currentQuestionIndex === this.questions.length) {
//       this.fetchResults();
//     }
//   }
  
//   fetchResults() {
//     const queryParams: any = {
//       color: this.userAnswers.color,
//       type: this.userAnswers.type,
//       maridaje: this.userAnswers.maridaje,
//       aroma: this.userAnswers.aroma,
//     };
  

//     if (this.userAnswers.price === 'menos de 15 euros') {
//       queryParams.price = '0-15';
//     } else if (this.userAnswers.price === '15-20 euros') {
//       queryParams.price = '15-20';
//     } else if (this.userAnswers.price === 'más de 20 euros') {
//       queryParams.price = '20-';
//     }
  

//     if (queryParams.color && queryParams.type) {
//       if (queryParams.color === 'blanco' || queryParams.color === 'tinto') {
//         delete queryParams.type;
//       }
//     }
  

  
//     this.quizService.filterWines(queryParams).subscribe(
//       (data: Wine[]) => {
//         this.recommendations = data;
//       },
//       (error) => {
//         console.error('Error al obtener recomendaciones:', error);
//       }
//     );
//   }
  


// addToCart(wine: Wine, quantity: number = 1): void {
//   const loggedIn = !!localStorage.getItem('token'); // проверяем авторизацию

//   this.cartService.addItemToCart(wine, quantity, loggedIn).subscribe({
//     next: (response) => {
//       console.log('Added to cart:', response);
//     },
//     error: (err) => {
//       console.error('Error adding to cart:', err);
//     }
//   });
// }


//   goToWineDetail(wineId: number){
//     this.router.navigate([`/wine/${wineId}`]);  
//   }
//   goBack() {
//     if (this.currentQuestionIndex > 0) {
//       this.currentQuestionIndex--;
//       if (this.currentQuestionIndex === 0) {
//         this.questions[0].options = ['Tinto', 'Blanco', 'Espumoso'];
//       }
//     }
//   }
  
  

// }

import { Component, inject, OnInit } from '@angular/core';
import { WineService } from '../../data/services/wine.service';
import { Wine } from '../../data/services/interfaces/wine';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../data/services/cart.service';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../../../public/assets/quiz/quiz-question';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiiiz.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  styleUrls: ['./quiiiz.component.scss']
})
export class QuiizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  userAnswers: any = {};
  recommendations: Wine[] | null = null;
  cartService = inject(CartService);

  constructor(private quizService: WineService, private router: Router) {}

  ngOnInit() {
    // загружаем вопросы при инициализации
    this.questions = JSON.parse(JSON.stringify(QUIZ_QUESTIONS));
  }

handleOptionSelect(optionKey: string) {
  const currentQuestion = this.questions[this.currentQuestionIndex];

  // Сохраняем ключ для сервера
  this.userAnswers[currentQuestion.key] = optionKey;

  if (currentQuestion.key === 'colorOrType') {
    if (optionKey === 'tinto') {
      this.questions[1].optionsKey = [
        { key: 'carne', translateKey: 'QUIZ.Q2.OPTIONS.MEAT' },
        { key: 'pasta', translateKey: 'QUIZ.Q2.OPTIONS.PASTA' },
        { key: 'aperitivo', translateKey: 'QUIZ.Q2.OPTIONS.APPETIZER' }
      ];
      this.questions[2].optionsKey = [
        { key: 'madera', translateKey: 'QUIZ.Q3.OPTIONS.WOOD' },
        { key: 'especias', translateKey: 'QUIZ.Q3.OPTIONS.SPICES' },
        { key: 'frutos maduros', translateKey: 'QUIZ.Q3.OPTIONS.RIPE_FRUITS' }
      ];
    } else if (optionKey === 'blanco') {
      this.questions[1].optionsKey = [
        { key: 'pescados y mariscos', translateKey: 'QUIZ.Q2.OPTIONS.FISH_SEAFOOD' },
        { key: 'aperitivos', translateKey: 'QUIZ.Q2.OPTIONS.APPETIZER' },
        { key: 'carnes', translateKey: 'QUIZ.Q2.OPTIONS.MEAT' }
      ];
      this.questions[2].optionsKey = [
        { key: 'frutas', translateKey: 'QUIZ.Q3.OPTIONS.FRUIT' },
        { key: 'floral', translateKey: 'QUIZ.Q3.OPTIONS.FLORAL' },
        { key: 'hierbas', translateKey: 'QUIZ.Q3.OPTIONS.HERBS' }
      ];
    } else if (optionKey === 'espumoso') {
      this.questions[1].optionsKey = [
        { key: 'pescados y mariscos', translateKey: 'QUIZ.Q2.OPTIONS.FISH_SEAFOOD' },
        { key: 'aperitivos', translateKey: 'QUIZ.Q2.OPTIONS.APPETIZER' },
        { key: 'carnes', translateKey: 'QUIZ.Q2.OPTIONS.MEAT' }
      ];
      this.questions[2].optionsKey = [
        { key: 'frutas', translateKey: 'QUIZ.Q3.OPTIONS.FRUIT' },
        { key: 'floral', translateKey: 'QUIZ.Q3.OPTIONS.FLORAL' },
        { key: 'bollería', translateKey: 'QUIZ.Q3.OPTIONS.PASTRY' }
      ];
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
      aroma: this.userAnswers.aroma
    };

    // сопоставление цены
    if (this.userAnswers.price === 'Q4.OPTIONS.0') {
      queryParams.price = '0-15';
    } else if (this.userAnswers.price === 'Q4.OPTIONS.1') {
      queryParams.price = '15-20';
    } else if (this.userAnswers.price === 'Q4.OPTIONS.2') {
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
    const loggedIn = !!localStorage.getItem('token');

    this.cartService.addItemToCart(wine, quantity, loggedIn).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }

  goToWineDetail(wineId: number) {
    this.router.navigate([`/wine/${wineId}`]);
  }

  goBack() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      if (this.currentQuestionIndex === 0) {
        // сброс опций к исходным
        this.questions = JSON.parse(JSON.stringify(QUIZ_QUESTIONS));
      }
    }
  }
}
