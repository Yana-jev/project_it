import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iBodega } from './interfaces/ibodega';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  baseApiUrl = 'http://localhost:3000/bodegas'

  http: HttpClient = inject(HttpClient);
  private translateService: TranslateService = inject(TranslateService);

  // Получение списка bodegas с учётом языка из TranslateService
  getBodega(): Observable<iBodega[]> {
    const lang = this.translateService.currentLang;
    const params = new HttpParams({ fromObject: { lang } }); // Альтернативный способ создания HttpParams

    return this.http.get<iBodega[]>(this.baseApiUrl, { params, withCredentials: true });
  }

  getBodegaById(id: number): Observable<iBodega> {
    const lang = this.translateService.currentLang;
    const params = new HttpParams({ fromObject: { lang } });

    return this.http.get<iBodega>(`${this.baseApiUrl}/${id}`, { params, withCredentials: true });
  }


  addBodega(bodegaData: FormData): Observable<iBodega> {
    return this.http.post<iBodega>(this.baseApiUrl, bodegaData, { withCredentials: true });
  }


  // getBodegaById(id: number): Observable<iBodega> {
  //   return this.http.get<iBodega>(`${this.baseApiUrl}/${id}`, { withCredentials: true });
  // }


  updateBodega(id: number, bodegaData: FormData): Observable<iBodega> {
    return this.http.put<iBodega>(`${this.baseApiUrl}/${id}`, bodegaData, { withCredentials: true });
  }


  deleteBodega(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${id}`, { withCredentials: true });
  }

  constructor() { }
}
