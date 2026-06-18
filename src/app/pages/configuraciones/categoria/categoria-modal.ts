import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfig } from '../../../shared/models';

export interface CategoriaDialogData {
    config: ModalConfig;
    nombre?: string;
}

@Component({
    selector: 'app-categoria-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    template: `
        <h2 mat-dialog-title>{{ data.config.title }}</h2>
        <mat-dialog-content>
            <form [formGroup]="form" class="pt-2">
                <mat-form-field appearance="outline" class="w-100">
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="nombre" placeholder="Nombre de la categoría" />
                    @if (form.get('nombre')?.hasError('required') && form.get('nombre')?.touched) {
                    <mat-error>El nombre es obligatorio</mat-error>
                    }
                </mat-form-field>
            </form>
        </mat-dialog-content>
        <mat-dialog-actions align="end" class="px-4 pb-3">
            <button mat-button (click)="onCancel()">Cancelar</button>
            <button mat-flat-button color="primary" (click)="onSave()" [disabled]="form.invalid">
                {{ data.config.isEditing ? 'Actualizar' : 'Guardar' }}
            </button>
        </mat-dialog-actions>
    `
})
export class CategoriaDialogComponent {
    protected form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CategoriaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CategoriaDialogData
    ) {
        this.form = new FormGroup({
            nombre: new FormControl<string | null>(data.nombre ?? null, [Validators.required, Validators.minLength(2)])
        });
    }

    onCancel(): void {
        this.form.reset();
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.form.invalid) return;
        this.dialogRef.close(this.form.value.nombre);
    }
}