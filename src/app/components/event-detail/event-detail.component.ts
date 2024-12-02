import { Component, OnInit } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { iEvent } from '../../data/services/interfaces/ievents';
import mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})

export class EventDetailComponent implements OnInit {

  event: iEvent | undefined;
  map: any;
  lng: number = 0;  
  lat: number = 0;  

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id')); 

    // Загружаем данные события по id
    this.eventService.getTestEvent().subscribe(events => {
      // Ищем нужное событие по id
      this.event = events.find(e => e.id_event === eventId);

      if (this.event) {
        if (this.event.location) {
          this.lat = this.event.latitude;
          this.lng = this.event.longitude;
          this.initMap();
        }
      }
    });
  }

  initMap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbTB3bmkxczkwMzEwMnNzNmR6YzN5dXY5In0.NOogDdPx-b1-wkMBw89YNg'; 
    this.map = new mapboxgl.Map({
      container: 'map',  // Элемент, в котором будет отображаться карта
      style: 'mapbox://styles/mapbox/streets-v11',  // Стиль карты
      center: [this.lng, this.lat],  // Центр карты (долгота, широта)
      zoom: 12  // Уровень приближения
    });

    // Добавление маркера на карту
    new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
  }
}