import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { IUser } from 'src/app/interfaces/user.interface';
import { GlobalState } from 'src/app/store/reducers/assessments.reducers';
import { selectAllUsers } from 'src/app/store/selectors/app.selectors';
import * as UserActions from '../../store/actions/users.actions';
import { dashboardPath } from 'src/app/shared/globals';

/**
 * a component of user list for an admin
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'lastName',
    'dateOfBirth',
    'role',
    'education',
    'position',
  ];
  dataSource$ = this.store.select(selectAllUsers);
  dataSourcePerPage!: IUser[];
  allDataSource!: IUser[];
  page = localStorage.getItem('currentUserPageIndex')
    ? localStorage.getItem('currentUserPageIndex')
    : 0;
  pageSize = localStorage.getItem('currentUserPageSize')
    ? localStorage.getItem('currentUserPageSize')
    : 5;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<GlobalState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsers());
    this.dataSource$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.allDataSource = value!;
      // getting data for pagination
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
      'currentUserPageIndex',
      pagination.pageIndex.toString()
    );
    localStorage.setItem('currentUserPageSize', pagination.pageSize.toString());
    let index = 0,
      startingIndex = pagination.pageIndex * pagination.pageSize,
      endingIndex = startingIndex + pagination.pageSize;
    this.dataSourcePerPage = this.allDataSource.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }

  returnBack(): void {
    this.router.navigate([dashboardPath]);
  }
}
