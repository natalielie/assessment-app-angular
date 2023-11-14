import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IAssessment } from 'src/app/interfaces/user.interface';
import * as UserActions from '../../store/user/actions/assessments.actions';
import { Store } from '@ngrx/store';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { selectAssessmentsData } from 'src/app/store/user/selectors/user.selectors';
import { AppState } from 'src/app/store/app.state';
import { UserState } from 'src/app/store/user/user.state';

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
  allDataSource = new MatTableDataSource<IAssessment>([]);
  page =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageIndex') as string,
      10
    ) ?? 0;
  pageSize =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageSize') as string,
      10
    ) ?? 3;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // get assessments
    this.store.dispatch(UserActions.getAssessments());

    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource!.data = value;

      if (this.paginator) {
        this.paginator.pageIndex = this.page;
        this.paginator.pageSize = this.pageSize;
        this.allDataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * updating page index and size of the paginator
   */
  updateRouteParameters($event: PageEvent | null): void {
    const params = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };
    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
    //Update route with Query Params
    this.location.go(urlTree.toString());
  }
}
