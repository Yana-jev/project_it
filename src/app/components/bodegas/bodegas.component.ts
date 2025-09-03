// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { iBodega } from '../../data/services/interfaces/ibodega';
// import { BodegaService } from '../../data/services/bodega.service';
// import { CommonModule } from '@angular/common';
// import { CardDesignComponent } from '../card-design/card-design.component';
// import { TranslateModule } from '@ngx-translate/core';

// @Component({
//   selector: 'bodegas',
//   standalone: true,
//   imports: [CommonModule, CardDesignComponent, TranslateModule],
//   templateUrl: './bodegas.component.html',
//   styleUrl: './bodegas.component.scss'
// })
// export class BodegasComponent {
//   bodegaService = inject(BodegaService);
//   bodegas: iBodega[] = []; 

//   startDate: string = ''; 
//   endDate: string = ''; 
  

//   constructor(private router: Router) {

//     this.bodegaService.getBodega()
//       .subscribe(val => {
//         console.log('Received bodegas:', val);
//         this.bodegas = val;
//       });
//   }

//   goToBodegaDetail(bodegaId: number) {
// console.log('Navigating to bodega:', bodegaId);
//     this.router.navigate([`/bodega-detail/${bodegaId}`]);  
//   }
// }

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { BodegaService } from '../../data/services/bodega.service';
import { CommonModule } from '@angular/common';
import { CardDesignComponent } from '../card-design/card-design.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '../../data/services/translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bodegas',
  standalone: true,
  imports: [CommonModule, CardDesignComponent, TranslateModule],
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.scss'
})
export class BodegasComponent implements OnInit, OnDestroy {
  bodegas: iBodega[] = [];

  private bodegaService = inject(BodegaService);
  private translateService = inject(TranslateService);
  private router = inject(Router);

  private langSub!: Subscription;

  ngOnInit(): void {
    // Загружаем данные при первом запуске
    this.loadBodegas();

    // Подписываемся на смену языка
    this.langSub = this.translateService.lang$.subscribe(() => {
      this.loadBodegas();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe(); // Очищаем подписку
  }

  loadBodegas(): void {
    this.bodegaService.getBodega().subscribe({
      next: (val) => {
        console.log('Received bodegas:', val);
        this.bodegas = val;
      },
      error: (err) => {
        console.error('Error fetching bodegas:', err);
      }
    });
  }

  goToBodegaDetail(bodegaId: number): void {
    this.router.navigate([`/bodega-detail/${bodegaId}`]);
  }
}
