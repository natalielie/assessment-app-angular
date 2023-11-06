import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';

import { IAssessment } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as UserActions from '../../store/actions/assessments.actions';
import { GlobalState } from 'src/app/store/reducers/assessments.reducers';
import { Store, select } from '@ngrx/store';
import {
  selectAssessmentsData,
  selectUserData,
} from 'src/app/store/selectors/assessments.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  isAdmin!: boolean;
  displayedColumns: string[] = [
    'id',
    'name',
    'users_resolved',
    'active',
    'image_url',
  ];
  dataSource$ = this.store.select(selectAssessmentsData);
  dataSourcePerPage!: IAssessment[];
  allDataSource!: IAssessment[];
  page = 0;
  pageSize = 3;

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private store: Store<GlobalState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //this.isAdmin = this.apiService.hasAdminRole();
    // this.dataSource.loadAssessments();

    // const user$ = this.store.select(selectUserData);

    // user$.pipe(takeUntil(this.$destroy)).subscribe((value) => {
    //   if (value?.role === 'admin') {
    //     return (this.isAdmin = true);
    //   } else return (this.isAdmin = false);
    // });
    this.isAdmin = this.authService.isAdmin();

    this.store.dispatch(UserActions.getAssessments());
    this.dataSource$.pipe(takeUntil(this.$destroy)).subscribe((value) => {
      this.allDataSource = value!;
      // getting data for pagination
      this.getDataForPagination({
        pageIndex: this.page,
        pageSize: this.pageSize,
      });
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  /**
   * getting data for pagination
   *
   * @param pagination page index and page size we get
   * from a user to manage pagination
   */
  getDataForPagination(pagination: { pageIndex: number; pageSize: number }) {
    let index = 0,
      startingIndex = pagination.pageIndex * pagination.pageSize,
      endingIndex = startingIndex + pagination.pageSize;
    this.dataSourcePerPage = this.allDataSource.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
