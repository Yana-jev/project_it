import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { iEvent } from '../../data/services/interfaces/ievents';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { BodegaService } from '../../data/services/bodega.service';
import { TranslateService } from '../../data/services/translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  events: iEvent[] = []; 
  limitedEvents: iEvent[] = []
  bodegas: iBodega[] = [];
  limitedBodegas: iBodega[] = [];
  
  private translate = inject(TranslateService);
  private langSubscription?: Subscription;

  constructor(
    private eventService: EventService, 
    private router: Router, 
    private bodegaService: BodegaService
  ) {}

ngOnInit(): void {
  this.langSubscription = this.translate.lang$.subscribe(lang => {
    if (lang) {
      this.loadData();
    }
  });
}

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

  private loadData(): void {
    this.bodegaService.getBodega().subscribe((data: iBodega[]) => {
      this.bodegas = data;
      this.limitedBodegas = this.bodegas.slice(0, 3);
    });

    this.eventService.getTestEvent().subscribe((data: iEvent[]) => {
      this.events = data;  
      this.limitedEvents = this.events.slice(0, 3); 
    });
  }

  goToBodegaDetail(bodegaId: number) {
    this.router.navigate([`/bodega-detail/${bodegaId}`]);  
  }
  
  goToEventDetail(eventId: number) {
    this.router.navigate([`/event-detail/${eventId}`]);  
  }
}
