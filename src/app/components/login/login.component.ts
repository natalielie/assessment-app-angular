import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil, tap, timer } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UserState } from 'src/app/store/reducers/assessments.reducers';
import * as UserActions from '../../store/actions/assessments.actions';
import { selectUserData } from 'src/app/store/selectors/assessments.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  submitted = false;
  //userData$ = this.store.select(selectUserData);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private store: Store<UserState>
  ) {}

  ngOnInit() {
    this.createForm();
    //  this.authService.filterEventSource(this.filterEventEmitter)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get form() {
    return this.userLoginForm.controls;
  }

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
    this.submitted = true;
    if (this.userLoginForm.valid) {
      const userValue = this.userLoginForm.getRawValue();
      this.store.dispatch(
        UserActions.login({
          email: userValue.email,
          password: userValue.password,
        })
      );
    } else {
      alert('Something went wrong, try again, please');
    }
  }
}
