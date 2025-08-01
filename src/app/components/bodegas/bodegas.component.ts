import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { BodegaService } from '../../data/services/bodega.service';
import { CommonModule } from '@angular/common';
import { CardDesignComponent } from '../card-design/card-design.component';

@Component({
  selector: 'bodegas',
  standalone: true,
  imports: [CommonModule, CardDesignComponent],
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.scss'
})
export class BodegasComponent {
  bodegaService = inject(BodegaService);
  bodegas: iBodega[] = []; 

  startDate: string = ''; 
  endDate: string = ''; 
  

  constructor(private router: Router) {

    this.bodegaService.getBodega()
      .subscribe(val => {
        console.log('Received bodegas:', val);
        this.bodegas = val;
      });
  }

  goToBodegaDetail(bodegaId: number) {
console.log('Navigating to bodega:', bodegaId);
    this.router.navigate([`/bodega-detail/${bodegaId}`]);  
  }
}
