import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'age-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './age-verification.component.html',
  styleUrl: './age-verification.component.scss'
})
export class AgePopupComponent {
  router = inject(Router);

  constructor() {
    this.checkAge();
  }

  checkAge() {
    // Проверка, если пользователь уже подтвердил возраст
    const isAgeVerified = localStorage.getItem('ageVerified');
    if (isAgeVerified) {
      return;
    }

    // Если возраст не подтвержден, показываем попап
    document.getElementById('age-popup')!.style.display = 'flex';
  }

  verifyAge() {
    // Сохраняем информацию о том, что пользователь подтвердил возраст
    localStorage.setItem('ageVerified', 'true');
    this.closePopup();
  }

  denyAge() {
    // Логика на случай, если пользователь не подтверждает возраст
    // Например, можно перенаправить на другую страницу
    this.router.navigate(['/']);
  }

  closePopup() {
    document.getElementById('age-popup')!.style.display = 'none';
  }
}