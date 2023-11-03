import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAssessment } from '../interfaces/user.interface';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable()
export class AssessmentDataSource extends DataSource<IAssessment> {
  assessments$ = new BehaviorSubject<IAssessment[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {
    super();
  }

  connect(): Observable<IAssessment[]> {
    return this.assessments$.asObservable();
  }

  disconnect(): void {
    this.assessments$.complete();
  }

  loadAssessments(): void {
    this.isLoading$.next(true);
    this.apiService.getAssessments().subscribe((assessment) => {
      this.assessments$.next(assessment);
      this.isLoading$.next(false);
    });
  }
}
