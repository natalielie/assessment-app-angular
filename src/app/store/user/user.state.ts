import {
  IAssessment,
  IAssessmentReport,
  IUser,
} from 'src/app/interfaces/user.interface';

export interface UserState {
  assessments: IAssessment[];
  assessmentReport: IAssessmentReport | null;
  usersTotal: IUser[];
  error: string | null;
}

export const userInitialState: UserState = {
  assessments: [],
  assessmentReport: null,
  usersTotal: [],
  error: null,
};
