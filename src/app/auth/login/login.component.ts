import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as UserActions from '../../store/auth/actions/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { AuthState } from 'src/app/store/auth/auth.state';
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

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.createForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
        Validators.minLength(8),
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
    } else {
      alert('Something went wrong, try again, please');
    }
  }
}
