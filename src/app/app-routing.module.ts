import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
//import { AdminGuard } from './guards/admin.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { AssessmentReportComponent } from './components/assessment-report/assessment-report.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report/:id',
    component: AssessmentReportComponent,
    //canActivate: [AdminGuard],
  },
  {
    path: 'admin-user-list',
    component: UserListComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
