import { createAction, props } from '@ngrx/store';
import {
  IAssessment,
  IAssessmentReport,
} from 'src/app/interfaces/user.interface';

/** actions for getting assessments */
export const getAssessments = createAction('[Assessments] Get Assessments');

export const assessmentsLoaded = createAction(
  '[Assessments] Assessments Loaded',
  props<{ assessmentResponse: IAssessment[] }>()
);

export const assessmentsLoadError = createAction(
  '[Assessments] Assessments Not Loaded',
  props<{ error: string }>()
);

/** actions for getting assessment reports */
export const getAssessmentReport = createAction(
  '[Assessments] Get Assessment Report',
  props<{ assessmentId: number | null }>()
);

export const assessmentReportLoaded = createAction(
  '[Assessments] Assessment Report Loaded',
  props<{ reportResponse: IAssessmentReport }>()
);

export const assessmentReportLoadError = createAction(
  '[Assessments] Assessment Report Not Loaded',
  props<{ error: string }>()
);
