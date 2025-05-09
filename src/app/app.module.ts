import { NgModule } from '@angular/core';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserFormComponent } from './components/availability-form/user-form/user-form.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';   

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { firebaseConfig } from '../environments/environment';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }
];

registerLocaleData(localeFr);
@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        UserFormComponent,
        LoginComponent
    ],
    imports: [
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
    }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
