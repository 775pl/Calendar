import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addMonths, subMonths, isSameDay } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { fr } from 'date-fns/locale';
import { Subject } from 'rxjs'; // Import de Subject

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  locale = fr;

  disponibilites: Date[] = [];
  events: CalendarEvent[] = [];
  refresh = new Subject<void>(); // Déclaration de la propriété refresh

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // future use: load user-specific data
  }

  addMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  subMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  toggleDisponibilite(date: Date): void {
    const index = this.disponibilites.findIndex(d => isSameDay(d, date));
    if (index > -1) {
      this.disponibilites.splice(index, 1);
    } else {
      this.disponibilites.push(date);
    }

    this.events = this.disponibilites.map(d => ({
      start: d,
      title: '🟢 Disponible',
      allDay: true,
      color: { primary: '#28a745', secondary: '#eaffea' }
    }));

    this.refresh.next(); // Émet un événement pour forcer la mise à jour de la vue
  }

  isDateDisponible(date: Date): boolean {
    return this.disponibilites.some(d => isSameDay(d, date));
  }
}