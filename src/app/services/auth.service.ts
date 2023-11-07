import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../shared/globals';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${API_URL}/api/users`);
  }

  login(email: string, password: string): Observable<IUser> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post<IUser>(`${API_URL}/api/login`, params, {
      headers: { skip: 'true' },
    });
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  // Check if the user is authenticated (you can implement this based on your authentication mechanism)
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    // return tokenNotExpired(token);
    return token !== null;
  }
}
