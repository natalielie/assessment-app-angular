import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap, timer } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  submitted = false;
  /**
   * A subject to prevent memory leaks
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
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
      this.authService
        .login(userValue.email, userValue.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (value) => {
            console.log(value);
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ token: value.token, role: value.role })
            );

            this.router.navigate(['dashboard']);
          },
        });
    } else {
      alert('Something went wrong, try again, please');
    }
  }
}
