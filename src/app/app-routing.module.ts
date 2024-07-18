import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [{ path: 'login', component: AuthComponent },
{ path: 'calendar', component:  MyCalendarComponent, canActivate: [authGuard]},
{ path: '', redirectTo: 'calendar', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
