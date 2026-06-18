import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container-fluid p-4">
      <div class="row g-4">
        <div class="col-12">
          <app-card title="Bienvenido al Sistema de Donaciones" subtitle="Panel principal">
            <p class="mb-0 text-muted">Selecciona una opción del menú para comenzar.</p>
          </app-card>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
