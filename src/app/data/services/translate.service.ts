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

get currentLang() {
   return this.ngxTranslate.currentLang || 'es';
}

setLang(lang: string) {
   this.ngxTranslate.use(lang);
   localStorage.setItem('lang', lang);
   this.langSubject.next(lang);
}
}
