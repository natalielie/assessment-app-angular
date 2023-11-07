import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { UserState } from 'src/app/store/reducers/assessments.reducers';
import * as UserActions from '../../store/actions/assessments.actions';
import { selectActiveUserData } from 'src/app/store/selectors/assessments.selectors';
/**
 * a component of login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;

  /** an observable of current user state data */
  stateData$ = this.store.select(selectActiveUserData);

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<UserState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get form() {
    return this.userLoginForm.controls;
  }

  /**
   * create a form of email and password
   */
  createForm() {
    this.userLoginForm = this.formBuilder.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.userLoginForm.valid) {
      const userValue = this.userLoginForm.getRawValue();
      this.store.dispatch(
        UserActions.login({
          email: userValue.email,
          password: userValue.password,
        })
      );
      this.stateData$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        if (value.error !== null) {
          alert(value.error);
        }
      });
    } else {
      alert('Something went wrong, try again, please');
    }
  }
}
