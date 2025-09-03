import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from './interfaces/ievents';
import { TranslateService } from './translate.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseApiUrl = 'http://localhost:3000/events'

  http: HttpClient = inject(HttpClient);



  private translateService = inject(TranslateService);

  /** Получение событий с учетом текущего языка */
  getTestEvent(): Observable<iEvent[]> {
    const lang = this.translateService.currentLang;
    const params = new HttpParams({ fromObject: { lang } });
    return this.http.get<iEvent[]>(this.baseApiUrl, { params, withCredentials: true });
  }

  getEventById(id: number): Observable<iEvent> {
    const lang = this.translateService.currentLang;
    const params = new HttpParams({ fromObject: { lang } });
    return this.http.get<iEvent>(`${this.baseApiUrl}/${id}`, { params, withCredentials: true });
  }

  addEvent(eventData: FormData): Observable<iEvent> {
    return this.http.post<iEvent>(this.baseApiUrl, eventData, { withCredentials: true });
  }


  updateEvent(id: number, eventData: FormData): Observable<iEvent> {
    return this.http.put<iEvent>(`${this.baseApiUrl}/${id}`, eventData, { withCredentials: true });
  }


  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${id}`, { withCredentials: true });
  }
  constructor() { }
}
