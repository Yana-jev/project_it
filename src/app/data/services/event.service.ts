import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseApiUrl = 'http://localhost:3000/book'

  http: HttpClient = inject(HttpClient);



  getTestEvent(){
    return this.http.get(`${this.baseApiUrl}`, { withCredentials: true }) 
  }

  constructor() { }
}
