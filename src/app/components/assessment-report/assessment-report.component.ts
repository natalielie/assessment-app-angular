import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import Chart from 'chart.js/auto';
import * as UserActions from '../../store/user/actions/assessments.actions';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { selectAssessmentReport } from 'src/app/store/user/selectors/user.selectors';

/**
 *  a component of assessments report in detail (graphs)
 */
@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrls: ['./assessment-report.component.scss'],
})
export class AssessmentReportComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  assessmentId!: number | null;
  chart!: Chart;
  /** an observable of assessment reports data */
  reportData$ = this.store.select(selectAssessmentReport);

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.assessmentId = +this.route.snapshot.params['id'] - 1;
    this.store.dispatch(
      UserActions.getAssessmentReport({ assessmentId: this.assessmentId })
    );

    this.reportData$.pipe(takeUntil(this.destroy$)).subscribe((report) => {
      if (report && this.canvas) {
        if (this.canvas?.nativeElement.getContext('2d')) {
          this.chart?.destroy();
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: Object.keys(report!.data),
              datasets: [
                {
                  label: 'Rate',
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
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.chart?.destroy();
  }

  returnBack(): void {
    this.location.back();
  }
}
