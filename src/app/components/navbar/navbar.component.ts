import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/service/auth.service';

/**
 * a component of the navbar for all pages
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAdmin!: boolean;
  isAuthorized!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isAuthorized = this.authService.isAuthorized();
  }

  logout(): void {
    localStorage.clear();
  }
}
