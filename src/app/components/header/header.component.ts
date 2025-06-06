import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { CartService } from '../../data/services/cart.service';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core'


@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMenuOpen = false;
  constructor(private translate: TranslateService) {
    translate.addLangs([ 'es', 'en', 'ru' ]);
    translate.setDefaultLang ('es')
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ru|es/) ? browserLang : 'en');
  }

  switchLang(event: Event){
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang)
   
  }

}

