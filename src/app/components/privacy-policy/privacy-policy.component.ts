import { Component } from '@angular/core';

@Component({
  selector: 'privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  closePopup() {
    const popup = document.getElementById('privacy-popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }
}
