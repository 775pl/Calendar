
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/calendar']);
    } catch (err) {
      alert('Erreur: ');
    }
  }
}
