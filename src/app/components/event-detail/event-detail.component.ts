import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { iEvent } from '../../data/services/interfaces/ievents';
import mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { iBodega } from '../../data/services/interfaces/ibodega';


@Component({
  selector: 'event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})

export class EventDetailComponent implements AfterViewChecked {
  bodegaId: number | null = null;
  bodega: iBodega | undefined;
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  private map: mapboxgl.Map | undefined;
  private mapInitialized = false;
  event: iEvent | undefined;


  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {const eventId = Number(this.route.snapshot.paramMap.get('id')); 
    this.eventService.getTestEvent().subscribe(events => {
      this.event = events.find(e => e.id_event === eventId);

    });}
    ngAfterViewChecked(): void {
      if (this.bodega && !this.mapInitialized && this.mapDivElement) {
        this.initializeMap();
        this.mapInitialized = true; 
      }
    }
  
    private initializeMap(): void {
      if (!this.mapDivElement) {
        console.error('Map container is not available.');
        return;
      }
    
      mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbTQ2eGducjUxNjgzMnFyNHJ4Y3Vxd29mIn0.sKUheGxgdU-PXpQ5392pyw';
    
      // const latitude = parseFloat(this.bodega?.latitud || '0'); 
      // const longitude = parseFloat(this.bodega?.longitud || '0'); 
    
    //   this.map = new mapboxgl.Map({
    //     container: this.mapDivElement.nativeElement, 
    //     style: 'mapbox://styles/mapbox/streets-v12', 
    //     center: [longitude, latitude], 
    //     zoom: 10, 
    //   });
    

    //   new mapboxgl.Marker()
    //     .setLngLat([longitude, latitude]) 
    //     .setPopup(
    //       new mapboxgl.Popup({ offset: 25 }) 
    //         .setText(this.bodega?.name || 'No name provided')
    //     )
    //     .addTo(this.map);
    // }
  
    // ngOnDestroy(): void {
    //   if (this.map) {
    //     this.map.remove();
    //   }
    // }

}
}