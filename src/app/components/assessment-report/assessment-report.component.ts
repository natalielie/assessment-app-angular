import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import Chart from 'chart.js/auto';
import { IAssessmentReport } from 'src/app/interfaces/user.interface';
import { selectAssessmentReport } from 'src/app/store/selectors/assessments.selectors';
import * as UserActions from '../../store/actions/assessments.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrls: ['./assessment-report.component.scss'],
})
export class AssessmentReportComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  title = 'Assessment Report';
  assessmentId!: string | null;
  chart: any = [];
  reportData$ = this.store.select(selectAssessmentReport);

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.assessmentId = params.get('id');
    });
    this.store.dispatch(
      UserActions.getAssessmentReport({ assessmentId: this.assessmentId })
    );

    this.reportData$.pipe(takeUntil(this.$destroy)).subscribe((report) => {
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: Object.keys(report!.data),
          datasets: [
            {
              //label: '# of Votes',
              data: Object.values(report!.data),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  returnBack(): void {
    this.router.navigate(['dashboard']);
  }
}
