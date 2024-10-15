import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient)

  baseUrl = 'http://localhost:3000/auth/'

login(payload:{email: string, password: string}): Observable<any>{
  return this.http.post(`${this.baseUrl}login`, payload)
}



  constructor() { }
}
