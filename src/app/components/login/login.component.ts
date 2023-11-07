import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { UserState } from 'src/app/store/reducers/assessments.reducers';
import * as UserActions from '../../store/actions/assessments.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  submitted = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
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
