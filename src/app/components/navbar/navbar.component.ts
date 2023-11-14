import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/service/auth.service';
import { dashboardPath } from 'src/app/shared/globals';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isAuthorized = this.authService.isAuthorized();
  }

  goToUsers(): void {
    this.router.navigate([dashboardPath], { queryParamsHandling: 'preserve' });
  }

  logout(): void {
    localStorage.clear();
  }
}
