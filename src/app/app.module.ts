import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AssessmentReportComponent } from './components/assessment-report/assessment-report.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  GlobalState,
  userReducers,
} from './store/reducers/assessments.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserAssessmentEffects } from './store/effects/assessments.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const userReducerMap: ActionReducerMap<GlobalState> = {
  userData: userReducers,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    NavbarComponent,
    AssessmentReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    StoreModule.forRoot(userReducerMap),
    EffectsModule.forRoot([UserAssessmentEffects]),
    StoreDevtoolsModule.instrument({}),
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
