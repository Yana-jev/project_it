import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

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
    return this.http.post(`${this.baseApiUrl}login`, credentials, { withCredentials: true }).pipe(
      tap(() => {

        localStorage.setItem('isAuthenticated', 'true');
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}logout`, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('isAuthenticated');
      })
    );
  }


  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}




