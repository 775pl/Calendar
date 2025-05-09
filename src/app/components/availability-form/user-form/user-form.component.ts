import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Laisse l'import ici

@Component({
  standalone: false, // Indique que ce composant est géré par un module
  selector: 'app-user-form',
  // imports: [FormsModule], // Retire FormsModule d'ici
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  name = '';
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  submitForm() {
    if (!this.name.trim() || !this.email.trim()) {
      this.errorMessage = "Nom et email requis";
      return;
    }

    this.http.post('/api/users', { name: this.name, email: this.email }).subscribe({
      next: () => {
        this.successMessage = 'Utilisateur créé avec succès !';
        this.name = '';
        this.email = '';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création';
        this.successMessage = '';
      }
    });
  }
}