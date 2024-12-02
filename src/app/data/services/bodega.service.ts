import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iBodega } from './interfaces/ibodega';


@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  baseApiUrl = 'http://localhost:3000/bodegas'

  http: HttpClient = inject(HttpClient);



  getBodega(): Observable<iBodega[]>{
    return this.http.get<iBodega[]>(`${this.baseApiUrl}`, { withCredentials: true }) 
  }
  addBodega(bodegaData: FormData): Observable<iBodega> {
    return this.http.post<iBodega>(this.baseApiUrl, bodegaData, { withCredentials: true });
  }
  getBodegaById(id: number): Observable<iBodega> {
    return this.http.get<iBodega>(`${this.baseApiUrl}/${id}`, { withCredentials: true });
  }

  updateBodega(id: number, bodegaData: FormData): Observable<iBodega> {
    return this.http.put<iBodega>(`${this.baseApiUrl}/${id}`, bodegaData, { withCredentials: true });
  }


  deleteBodega(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${id}`, { withCredentials: true });
  }
  constructor() { }
}
