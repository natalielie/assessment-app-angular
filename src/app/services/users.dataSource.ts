import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Injectable()
export class UsersDataSource extends DataSource<IUser> {
  users$ = new BehaviorSubject<IUser[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {
    super();
  }

  connect(): Observable<IUser[]> {
    return this.users$.asObservable();
  }

  disconnect(): void {
    this.users$.complete();
  }

  loadUsers(): void {
    this.isLoading$.next(true);
    this.authService.getAllUsers().subscribe((users) => {
      this.users$.next(users);
      this.isLoading$.next(false);
    });
  }
}
