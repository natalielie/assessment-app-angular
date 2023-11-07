import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalState } from 'src/app/store/reducers/assessments.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAdmin!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }
}
