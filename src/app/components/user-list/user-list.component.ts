import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from 'src/app/interfaces/user.interface';
import * as UserActions from '../../store/user/actions/users.actions';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { selectAllUsers } from 'src/app/store/user/selectors/user.selectors';
import { AppState } from 'src/app/store/app.state';
import { UserState } from 'src/app/store/user/user.state';
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
  allDataSource = new MatTableDataSource<IUser>([]);
  page =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageIndex') as string,
      10
    ) ?? 0;
  pageSize =
    Number.parseInt(
      this.route.snapshot.queryParamMap.get('pageSize') as string,
      10
    ) ?? 5;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsers());
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
    console.log(event);
    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
    //Update route with Query Params
    this.location.go(urlTree.toString());
  }

  returnBack(): void {
    this.location.back();
    this.router.navigate([dashboardPath], { queryParamsHandling: 'preserve' });
  }
}
