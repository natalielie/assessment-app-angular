import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IAssessment } from 'src/app/interfaces/user.interface';
import * as UserActions from '../../store/actions/assessments.actions';
import { GlobalState } from 'src/app/store/reducers/assessments.reducers';
import { Store } from '@ngrx/store';
import { selectAssessmentsData } from 'src/app/store/selectors/app.selectors';
import { MatPaginator } from '@angular/material/paginator';

/**
 *  a component of the main dashboard of assessments
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'users_resolved',
    'active',
    'image_url',
  ];
  /** an observable of assessment data */
  dataSource$ = this.store.select(selectAssessmentsData);

  allDataSource!: IAssessment[];
  /** assessment data per one page of paginator */
  dataSourcePerPage!: IAssessment[];
  page = localStorage.getItem('currentDasboardPageIndex')
    ? localStorage.getItem('currentDasboardPageIndex')
    : 0;
  pageSize = localStorage.getItem('currentDasboardPageSize')
    ? localStorage.getItem('currentDasboardPageSize')
    : 3;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<GlobalState>) {}

  ngOnInit(): void {
    // get assessments
    this.store.dispatch(UserActions.getAssessments());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource = value!;

      // get data for pagination
      this.getDataForPagination({
        pageIndex: +this.page!,
        pageSize: +this.pageSize!,
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * getting data for pagination
   *
   * @param pagination page index and page size we get
   * from a user to manage pagination
   */
  getDataForPagination(pagination: { pageIndex: number; pageSize: number }) {
    localStorage.setItem(
      'currentDasboardPageIndex',
      pagination.pageIndex.toString()
    );
    localStorage.setItem(
      'currentDasboardPageSize',
      pagination.pageSize.toString()
    );
    let index = 0,
      startingIndex = pagination.pageIndex * pagination.pageSize,
      endingIndex = startingIndex + pagination.pageSize;
    this.dataSourcePerPage = this.allDataSource.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
