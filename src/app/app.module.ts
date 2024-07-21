import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthComponent } from './auth/auth.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpRequestsService } from './services/http-requests.service';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BpnService } from './services/data/bpn.service';
import { LocalStorageService } from './services/data/localStorage.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MyCalendarComponent,
    NavBarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    BpnService,
    LocalStorageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }