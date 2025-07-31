import { Component, inject } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { CommonModule} from '@angular/common';
import { iEvent } from '../../data/services/interfaces/ievents';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardDesignComponent } from "../card-design/card-design.component";


@Component({
  selector: 'events',
  standalone: true,
  imports: [CommonModule, FormsModule, CardDesignComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',

})
export class EventsComponent {

  eventService = inject(EventService);
  events: iEvent[] = []; 
  filteredEvents: iEvent[] = []; 
  startDate: string = ''; 
  endDate: string = ''; 
  

  constructor(private router: Router) {

    this.eventService.getTestEvent()
      .subscribe(val => {
        console.log('Received events:', val);
        this.events = val;
        this.filteredEvents = val;
      });
  }


  filterEvents() {
    if (this.startDate && this.endDate) {

      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.filteredEvents = this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
      });
    } else {

      this.filteredEvents = this.events;
    }
    console.log('Filtered Events:', this.filteredEvents);
  }

  goToEventDetail(eventId: number) {

    this.router.navigate([`/event-detail/${eventId}`]);  
  }
}


