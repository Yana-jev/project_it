import { Component } from '@angular/core';
import { QuizQuestion } from '../../data/services/interfaces/iquiz';
import { Wine } from '../../data/services/interfaces/wine';
import { questions } from './quiz-preguntas';
import { CommonModule } from '@angular/common';

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

  showResults() {
    const totalScore = this.selectedAnswers.reduce((acc, score) => acc + score, 0);
    console.log('Total Score:', totalScore);
    // Логика для отображения результатов на основе totalScore
  }
}
