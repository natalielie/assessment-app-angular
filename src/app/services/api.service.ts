import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from '../shared/globals';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  IUser,
  IAssessment,
  IAssessmentReport,
} from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = false;

  constructor(private http: HttpClient) {
    //this.loggedIn.next(this.isAuthenticated());
    // this.isAdmin.next(this.hasAdminRole());
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${API_URL}/api/users`);
  }

  getAssessments(): Observable<IAssessment[]> {
    return this.http.get<IAssessment[]>(`${API_URL}/api/userassessments`);
  }

  getAssessmentReport(assessmentId: number): Observable<IAssessmentReport[]> {
    const params = new HttpParams().set('id', assessmentId);
    return this.http.get<IAssessmentReport[]>(
      `${API_URL}/api/userassessments/graph${params}`
    );
  }
}
