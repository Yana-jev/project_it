import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) {}

  signUp(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseApiUrl}register`, credentials, { withCredentials: true });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseApiUrl}login`, credentials, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.baseApiUrl}logout`, {}, { withCredentials: true });
  }



}
