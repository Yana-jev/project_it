import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = 'http://localhost:3000/auth/';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  signUp(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseApiUrl}register`, credentials, { withCredentials: true });
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}login`, credentials, { withCredentials: true }).pipe(
      tap((user) => {
                localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user)); 
      })
    );
  }


  logout(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}logout`, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUser = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
      })
    );
  }
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}




