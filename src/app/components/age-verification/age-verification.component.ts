import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'age-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './age-verification.component.html',
  styleUrl: './age-verification.component.scss'
})

export class AgePopupComponent implements AfterViewInit {
  @ViewChild('cookiePopup', { static: false }) cookiePopup!: ElementRef;
  @ViewChild('agePopup', { static: false }) agePopup!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    console.log('Checking cookie consent...');
    this.checkCookieConsent();
    console.log('Checking age verification...');
    this.checkAge();
  }


  checkCookieConsent() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    console.log('Cookies Accepted:', cookiesAccepted);
    if (!cookiesAccepted) {
      console.log('Displaying cookie popup...');
      this.cookiePopup.nativeElement.classList.remove('hidden');
    }
  }

 
  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.closeCookiePopup();
  }

  closeCookiePopup() {
    if (this.cookiePopup) {
      this.cookiePopup.nativeElement.classList.add('hidden');
    }
  }


  checkAge() {
    const isAgeVerified = localStorage.getItem('ageVerified');
    console.log('Age Verified:', isAgeVerified);
    if (!isAgeVerified) {
      console.log('Displaying age verification popup...');
      this.agePopup.nativeElement.classList.remove('hidden');
    }
  }


  verifyAge() {
    localStorage.setItem('ageVerified', 'true');
    this.closeAgePopup();
  }


  closeAgePopup() {
    if (this.agePopup) {
      this.agePopup.nativeElement.classList.add('hidden');
    }
  }


  denyAge() {
    this.router.navigate(['/']);
  }
}
  
