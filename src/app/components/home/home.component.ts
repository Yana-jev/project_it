import { Component, OnInit } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { iEvent } from '../../data/services/interfaces/ievents';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { BodegaService } from '../../data/services/bodega.service';


@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  events: iEvent[] = []; 
  limitedEvents: iEvent[] = []
  bodegas: iBodega[]=[]
  limitedBodegas: iBodega[]=[]

  constructor(private eventService: EventService, private router: Router, private bodegaService: BodegaService) {

  }

  ngOnInit(): void {
    this.bodegaService.getBodega().subscribe((data: iBodega[])=>{
      this.bodegas = data;
      this.limitedBodegas = this.bodegas.slice(0,3);
    })

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