import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersDataSource } from 'src/app/services/users.dataSource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  displayedColumns: string[] = ['first_name', 'last_name', 'role'];
  dataSource = new UsersDataSource(this.authService);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.dataSource.loadUsers();
  }
}
