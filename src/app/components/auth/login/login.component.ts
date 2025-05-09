import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}
  errorMessage: string = '';
  async login() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/calendar']);
    } catch (error: any) {
      this.errorMessage = this.formatError(error.code);
    }
  }

  
  formatError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return "Aucun utilisateur trouvé avec cet email.";
      case 'auth/wrong-password':
        return "Mot de passe incorrect.";
      case 'auth/invalid-email':
        return "Email invalide.";
      default:
        return "Une erreur inconnue est survenue.";
    }
  }
}