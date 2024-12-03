import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from "./components/footer/footer.component";
import { AgePopupComponent } from "./components/age-verification/age-verification.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, AgePopupComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAdult = localStorage.getItem('ageVerified') === 'true';

  updateAgeStatus() {
    this.isAdult = localStorage.getItem('ageVerified') === 'true';
  }
  title = 'project_it';
}
