import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { EventsComponent } from "../events/events.component";
import { FooterComponent } from '../footer/footer.component';
import { EventService } from '../../data/services/event.service';
import { iEvent } from '../../data/services/interfaces/ievents';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'home',
  standalone: true,
  imports: [LoginComponent, EventsComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  events: iEvent[] = []; 
  limitedEvents: iEvent[] = []

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {

    this.eventService.getTestEvent().subscribe((data: iEvent[]) => {
      this.events = data;  // Сохраняем все события в массив
      this.limitedEvents = this.events.slice(0, 3);  // Берем только первые 3 события
    });
  }


  goToEventDetail(eventId: number) {

    this.router.navigate([`/event-detail/${eventId}`]);  
  }
}