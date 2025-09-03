import { Component, OnDestroy } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { iEvent } from '../../data/services/interfaces/ievents';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateService } from '../../data/services/translate.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'event-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, TranslateModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {
  event: iEvent | undefined;
  description: string = '';
  eventId: number | null = null;
  private langSub!: Subscription;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    this.langSub = this.translateService.lang$.subscribe(lang => {
      this.loadEvent(lang);
  })
  }

  loadEvent(lang: string) {
    if (!this.eventId) return;

    this.eventService.getTestEvent().subscribe(events => {
      const found = events.find(e => e.id_event === this.eventId);
      if (found) {
        this.event = found;

        // @ts-ignore
        const localizedDesc = found[`description_${lang}`];
        this.description = localizedDesc || found.description;
      }
    });
  }
}