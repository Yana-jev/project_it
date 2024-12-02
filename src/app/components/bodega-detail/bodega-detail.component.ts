import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { ActivatedRoute } from '@angular/router';
import { BodegaService } from '../../data/services/bodega.service';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'bodega-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bodega-detail.component.html',
  styleUrl: './bodega-detail.component.scss'
})
export class BodegaDetailComponent implements AfterViewInit, OnDestroy {
  bodegaId: number | null = null;
  bodega: iBodega | undefined;

  private mapboxAccessToken = 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbTQ2eGducjUxNjgzMnFyNHJ4Y3Vxd29mIn0.sKUheGxgdU-PXpQ5392pyw';
  private map: mapboxgl.Map | undefined;

  constructor(
    private route: ActivatedRoute,
    private bodegaService: BodegaService
  ) {
    const bodegaId = Number(this.route.snapshot.paramMap.get('id'));
    this.bodegaService.getBodega().subscribe(bodegas => {
      this.bodega = bodegas.find(e => e.id_bodega === bodegaId);
    });
  }

  ngAfterViewInit(): void {
    mapboxgl.accessToken = this.mapboxAccessToken;

    // Инициализация карты
    this.map = new mapboxgl.Map({
      container: 'map', // id div-а из HTML
      style: 'mapbox://styles/mapbox/streets-v11', // стиль карты
      center: [0, 0], // координаты центра карты
      zoom: 2, // начальный уровень зума
    });
  }

  ngOnDestroy(): void {
    // Уничтожение карты, чтобы избежать утечек памяти
    if (this.map) {
      this.map.remove();
    }
  }
}

