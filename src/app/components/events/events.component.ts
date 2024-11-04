import { Component, inject } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { JsonPipe } from '@angular/common';
import { iEvent } from '../../data/services/interfaces/ievents';

@Component({
  selector: 'events',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  eventService = inject(EventService)
  events: iEvent[] = []

  constructor(){
    this.eventService.getTestEvent()
    .subscribe(val =>{
      console.log('Received events:', val);
      this.events = val
    })
  }
}
