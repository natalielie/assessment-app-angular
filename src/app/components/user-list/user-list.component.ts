import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { IAssessment, IUser } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalState } from 'src/app/store/reducers/assessments.reducers';
import {
  selectAllUsers,
  selectAssessmentsData,
} from 'src/app/store/selectors/assessments.selectors';
import * as UserActions from '../../store/actions/assessments.actions';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  isAdmin!: boolean;
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
  page = 0;
  pageSize = 5;

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<GlobalState>,
    private authService: AuthService,
    private router: Router
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

    this.store.dispatch(UserActions.getUsers());
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

  returnBack(): void {
    this.router.navigate(['dashboard']);
  }
}
