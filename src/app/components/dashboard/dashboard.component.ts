import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IAssessment } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { AssessmentDataSource } from 'src/app/services/assessment.dataSource';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isAdmin!: boolean;
  displayedColumns: string[] = [
    'id',
    'name',
    'users_resolved',
    'active',
    'image_url',
  ];
  dataSource = new AssessmentDataSource(this.apiService);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    //this.isAdmin = this.apiService.hasAdminRole();
    this.dataSource.loadAssessments();
  }
}
