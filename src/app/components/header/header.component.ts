import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { CartService } from '../../data/services/cart.service';
import { CommonModule } from '@angular/common';
import {TranslateService,TranslatePipe,TranslateDirective} from '@ngx-translate/core'


@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 isMenuOpen = false;
  currentLang = 'es';
  isLoaded = false;
 constructor(private translate: TranslateService) {
    translate.addLangs(['es', 'en', 'ru']);
    const savedLang = localStorage.getItem('lang') || 'es';
    this.currentLang = savedLang;
    translate.setDefaultLang(savedLang);
    translate.use(savedLang);

    // ⏳ Подписка на событие завершения загрузки языка
    this.translate.onLangChange.subscribe(() => {
      this.isLoaded = true;
    });
  }

  switchLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.isLoaded = false; // сбрасываем флаг, ждём загрузки
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang = lang;
  }
}
