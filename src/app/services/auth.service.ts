import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from '../shared/globals';

import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, IAssessment } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    //this.loggedIn.next(this.isAuthenticated());
    // this.isAdmin.next(this.hasAdminRole());
  }

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

  // Check if the user is logged in
  // isLoggedIn(): Observable<boolean> {
  //   return this.loggedIn.asObservable();
  // }

  // Check if the user is authenticated (you can implement this based on your authentication mechanism)
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    // return tokenNotExpired(token);
    return token !== null;
  }
}
