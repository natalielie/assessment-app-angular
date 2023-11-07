import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAssessment } from '../interfaces/user.interface';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { GlobalState, UserState } from '../store/reducers/assessments.reducers';
import * as UserActions from './../store/actions/assessments.actions';

@Injectable()
export class AssessmentDataSource extends DataSource<IAssessment> {
  assessments$ = new BehaviorSubject<IAssessment[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  dataSource$!: Observable<IAssessment[] | null>;

  constructor(private apiService: ApiService, private store: Store<UserState>) {
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
    this.store.dispatch(UserActions.getAssessments());
    this.isLoading$.next(false);
    // this.apiService.getAssessments().subscribe((assessment) => {
    //   this.assessments$.next(assessment);
    //
    // });
  }
}
