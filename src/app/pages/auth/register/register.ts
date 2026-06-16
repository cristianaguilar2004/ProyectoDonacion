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
import { Alerts } from '../../../shared/notifications/alerts';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  protected form!: FormGroup;
  protected isLoading = signal(false);
  protected hidePassword = signal(true);
  protected hideConfirmPassword = signal(true);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onInitForm();
  }

  onInitForm(): void {
    this.form = new FormGroup({
      nombre: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      Alerts.Warning('Las contraseñas no coinciden');
      return;
    }

    this.isLoading.set(true);
    Alerts.Loading('Creando cuenta...');

    const { confirmPassword, ...data } = this.form.value;

    this.authService.register(data)
      .then((response) => {
        Alerts.Success(response.message || 'Cuenta creada exitosamente');
        this.onInitForm();
        this.router.navigate(['/auth/login']);
      })
      .catch((error) => {
        Alerts.Error(error?.error?.message || 'Error al crear la cuenta');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }
}
