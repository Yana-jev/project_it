import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from './interfaces/ievents';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseApiUrl = 'http://localhost:3000/events'

  http: HttpClient = inject(HttpClient);



  getTestEvent(): Observable<iEvent[]>{
    return this.http.get<iEvent[]>(`${this.baseApiUrl}`, { withCredentials: true }) 
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
