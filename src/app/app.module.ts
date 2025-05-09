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



// Routes directement ici
const routes: Routes = [
  { path: '', component: CalendarComponent }
];
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    UserFormComponent
  ],
  imports: [
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
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
