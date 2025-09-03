import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-design',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-design.component.html',
  styleUrl: './card-design.component.scss'
})
export class CardDesignComponent {
 @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() extraInfo?: any;

  @Output() clicked = new EventEmitter<void>();

  onCardClick() {
    this.clicked.emit();
  }
}
