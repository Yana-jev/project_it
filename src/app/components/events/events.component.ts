import { Component, inject } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'events',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  eventService = inject(EventService)
  events:any = []

  constructor(){
    this.eventService.getTestEvent()
    .subscribe(val =>{
      this.events = val
    })
  }
}
