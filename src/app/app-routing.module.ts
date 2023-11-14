import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { AssessmentReportComponent } from './components/assessment-report/assessment-report.component';
import { AdminGuard } from './guards/admin.guard';
import {
  adminPath,
  dashboardPath,
  loginPath,
  reportPath,
} from './shared/globals';
import { AssessmentGuard } from './guards/assessment.guard';

const routes: Routes = [
  { path: '', redirectTo: loginPath, pathMatch: 'full' },
  {
    path: loginPath,
    loadChildren: async () =>
      (await import('./auth/lazy-loading/lazy-loading.module'))
        .LazyLoadingModule,
  },
  {
    path: dashboardPath,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: reportPath,
    component: AssessmentReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: adminPath,
    component: UserListComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
