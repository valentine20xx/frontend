import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
  MatInputModule, MatIconModule, MatDatepickerModule,
  MatNativeDateModule, MatPaginatorModule, MatDialogModule,
  MatTableModule, MatButtonModule, MatToolbarModule, MatSelectModule
} from '@angular/material';

import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VacationCancellationComponent} from './vacations/vacation-cancellation/vacation-cancellation.component';
import {TimeRangeComponent} from './time-range/time-range.component';
import {VacationsComponent} from './vacations/vacations.component';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {UsersComponent} from './users/users.component';
import {UserDeactivateComponent} from './users/user-deactivate/user-deactivate.component';
import {VacationCreateComponent} from './vacations/vacation-create/vacation-create.component';
import {LastComaFirstNamePipe} from './last-coma-first-name.pipe';
import {TimeRangeCreateComponent} from './time-range/time-range-create/time-range-create.component';
import {TimeRangeCancellationComponent} from './time-range/time-range-cancellation/time-range-cancellation.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'user/:userid/vacation-time-ranges', component: TimeRangeComponent},
  {path: 'user/:userid/vacation-time-ranges/:vacationTimeRangeId/vacations', component: VacationsComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    VacationCancellationComponent,
    TimeRangeComponent,
    VacationsComponent,
    UserCreateComponent,
    UsersComponent,
    UserDeactivateComponent,
    VacationCreateComponent,
    LastComaFirstNamePipe,
    TimeRangeCreateComponent,
    TimeRangeCancellationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, MatDatepickerModule, MatNativeDateModule,
    MatToolbarModule, MatButtonModule, MatTableModule, MatDialogModule,
    MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    FlexLayoutModule, ReactiveFormsModule
  ],
  entryComponents: [
    UserCreateComponent, UserDeactivateComponent, VacationCreateComponent, VacationCancellationComponent, TimeRangeCreateComponent,
    TimeRangeCancellationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
