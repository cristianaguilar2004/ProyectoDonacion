import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="shadow border-0 h-100 app-card">
      @if (title()) {
        <div class="card-gradient-header">
          <mat-card-header class="pb-2">
            <mat-card-title class="fs-5 fw-bold text-white">{{ title() }}</mat-card-title>
            @if (subtitle()) {
              <mat-card-subtitle class="text-white text-opacity-75">{{ subtitle() }}</mat-card-subtitle>
            }
          </mat-card-header>
        </div>
      }
      <mat-card-content class="card-body-content">
        <ng-content />
      </mat-card-content>
      @if (showActions()) {
        <mat-card-actions class="px-3 pb-3">
          <ng-content select="[actions]" />
        </mat-card-actions>
      }
    </mat-card>
  `,
  styles: `
    .app-card { border-radius: 16px !important; box-shadow: 0 6px 24px rgba(0,0,0,0.10) !important; }
    .card-gradient-header {
      background: linear-gradient(135deg, #3f51b5, #5c6bc0);
      border-radius: 16px 16px 0 0;
      padding: 16px 16px 8px 16px;
      margin: -1px -1px 0 -1px;
    }
    .card-gradient-header .mat-mdc-card-subtitle {
      color: rgba(255,255,255,0.75) !important;
    }
    .card-body-content {
      padding: 20px 16px !important;
    }
  `,
})
export class CardComponent {
  readonly title = input<string>();
  readonly subtitle = input<string>();
  readonly showActions = input(false);
}