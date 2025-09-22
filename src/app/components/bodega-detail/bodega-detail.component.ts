// import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
// import { iBodega } from '../../data/services/interfaces/ibodega';
// import { ActivatedRoute } from '@angular/router';
// import { BodegaService } from '../../data/services/bodega.service';
// import { CommonModule } from '@angular/common';
// import { Map } from 'mapbox-gl';
// import mapboxgl from 'mapbox-gl';

// @Component({
//   selector: 'bodega-detail',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './bodega-detail.component.html',
//   styleUrls: ['./bodega-detail.component.scss']
// })
// export class BodegaDetailComponent implements AfterViewChecked, OnDestroy {
//   bodegaId: number | null = null;
//   bodega: iBodega | undefined;

//   @ViewChild('mapDiv') mapDivElement!: ElementRef;

//   private map: mapboxgl.Map | undefined;
//   private mapInitialized = false;

//   constructor(
//     private route: ActivatedRoute,
//     private bodegaService: BodegaService
//   ) {
  
//     const bodegaId = Number(this.route.snapshot.paramMap.get('id'));
//     this.bodegaService.getBodega().subscribe(bodegas => {
//       this.bodega = bodegas.find(e => e.id_bodega === bodegaId);
//     });
//   }

//   ngAfterViewChecked(): void {
//     if (this.bodega && !this.mapInitialized && this.mapDivElement) {
//       this.initializeMap();
//       this.mapInitialized = true; 
//     }
//   }

//   private initializeMap(): void {
//     if (!this.mapDivElement) {
//       console.error('Map container is not available.');
//       return;
//     }
  
//     mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbTQ2eGducjUxNjgzMnFyNHJ4Y3Vxd29mIn0.sKUheGxgdU-PXpQ5392pyw';
  
//     const latitude = parseFloat(this.bodega?.latitud || '0'); 
//     const longitude = parseFloat(this.bodega?.longitud || '0'); 
  
//     this.map = new mapboxgl.Map({
//       container: this.mapDivElement.nativeElement, 
//       style: 'mapbox://styles/mapbox/streets-v12', 
//       center: [longitude, latitude], 
//       zoom: 10, 
//     });
  
//     // Добавляем маркер
//     new mapboxgl.Marker()
//       .setLngLat([longitude, latitude]) 
//       .setPopup(
//         new mapboxgl.Popup({ offset: 25 }) 
//           .setText(this.bodega?.bodega_name || 'No name provided')
//       )
//       .addTo(this.map);
//   }

//   ngOnDestroy(): void {
//     if (this.map) {
//       this.map.remove();
//     }
//   }
// }

import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../../data/services/bodega.service';
import { CommonModule } from '@angular/common';
import { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { TranslateService } from '../../data/services/translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bodega-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bodega-detail.component.html',
  styleUrls: ['./bodega-detail.component.scss']
})
export class BodegaDetailComponent implements AfterViewChecked, OnDestroy {
  bodegaId: number | null = null;
  bodega: iBodega | undefined;
  description: string = '';

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  private map: mapboxgl.Map | undefined;
  private mapInitialized = false;
  private langSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bodegaService: BodegaService,
    private translateService: TranslateService
  ) {
    this.bodegaId = Number(this.route.snapshot.paramMap.get('id'));

    this.langSub = this.translateService.lang$.subscribe(lang => {
      this.loadBodega(lang);
    });
  }

  loadBodega(lang: string) {
    if (!this.bodegaId) return;

    this.bodegaService.getBodega().subscribe(bodegas => {
      const found = bodegas.find(e => e.id_bodega === this.bodegaId);
      if (found) {
        this.bodega = found;

        // @ts-ignore — так как дополнительных полей (description_en и т.д.) нет в интерфейсе
        const localizedDesc = found[`description_${lang}`];
        this.description = localizedDesc || found.description;
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.bodega && !this.mapInitialized && this.mapDivElement) {
      this.initializeMap();
      this.mapInitialized = true;
    }
  }

  private initializeMap(): void {
    if (!this.mapDivElement) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbWZxczVlOXUwMjQ3MmtzZXhyNGJ2d2Z1In0.rIrK4fP6mE_tB3WWiIhW-A';

    const latitude = parseFloat(this.bodega?.latitud || '0');
    const longitude = parseFloat(this.bodega?.longitud || '0');

    this.map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setText(this.bodega?.bodega_name || 'No name provided')
      )
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
    if (this.langSub) this.langSub.unsubscribe();
  }
}
