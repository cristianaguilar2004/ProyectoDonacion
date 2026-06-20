import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { NotificacionService } from '../../layout/services/notificacion.service';
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  protected form!: FormGroup;
  protected isLoading = signal(false);
  protected hidePassword = signal(true);

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.onInitForm();
  }

  onInitForm(): void {
    this.form = new FormGroup({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.required]),
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    Alerts.Loading('Iniciando sesión...');

    this.authService.login(this.form.value)
      .then((response) => {
        Alerts.Success(response.message || '¡Bienvenido de nuevo!');
        this.onInitForm();
        const userId = this.authService.currentUser()?.nameidentifier;
        if (userId) this.notificacionService.conectar(userId);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        Alerts.Error(error?.error?.message || 'Error al iniciar sesión');
      }).finally(() => {
        this.isLoading.set(false);
      });
  }
}
