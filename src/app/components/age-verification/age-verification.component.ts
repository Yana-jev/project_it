import { Component } from '@angular/core';

@Component({
  selector: 'age-verification',
  standalone: true,
  imports: [],
  templateUrl: './age-verification.component.html',
  styleUrl: './age-verification.component.scss'
})
export class AgeVerificationComponent {
  showPopup: boolean = true;

  ngOnInit(): void {

    const isOfAge = localStorage.getItem('isOfAge');
    if (isOfAge) {
      this.showPopup = false;
    }
  }

  confirmAge(): void {

    localStorage.setItem('isOfAge', 'true');
    this.showPopup = false;
  }
}
