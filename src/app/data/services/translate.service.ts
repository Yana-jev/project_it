// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private langSubject = new BehaviorSubject<string>('es');
  lang$ = this.langSubject.asObservable();

  constructor(private ngxTranslate: NgxTranslateService) {
    this.ngxTranslate.addLangs(['es', 'en', 'ru']);

    const savedLang = localStorage.getItem('lang') || 'es';
    this.setLang(savedLang);
  }

  /** Теперь всегда отдаёт актуальное значение языка из BehaviorSubject */
  get currentLang(): string {
    return this.langSubject.value;
  }

  setLang(lang: string) {
    // 1. Сначала обновляем локальное состояние
    this.langSubject.next(lang);

    // 2. Передаём в ngx-translate для перевода интерфейса
    this.ngxTranslate.use(lang);

    // 3. Сохраняем в localStorage
    localStorage.setItem('lang', lang);
  }
}
