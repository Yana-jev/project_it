import { Component, inject, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { iBodega } from '../../data/services/interfaces/ibodega';
import { BodegaService } from '../../data/services/bodega.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'bodegas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bodegas.component.html',
  styleUrl: './bodegas.component.scss'
})
export class BodegasComponent {
  bodegaService = inject(BodegaService);
  bodegas: iBodega[] = []; 

  startDate: string = ''; 
  endDate: string = ''; 
  
color = 'blue'
ageOfUsers = [{age: 20}, {age: 26}, {age: 22}]

  constructor(private router: Router) {


    this.bodegaService.getBodega()
      .subscribe(val => {
        console.log('Received bodegas:', val);
        this.bodegas = val;
      });
  }

  changeColor(newColor: string){
    this.color = newColor
  }

  checkCurrentValue(event: Event){
    const target = event.target as HTMLInputElement
console.log('e', target.value)
  }
  goToBodegaDetail(bodegaId: number) {

    this.router.navigate([`/bodega-detail/${bodegaId}`]);  
  }
}
