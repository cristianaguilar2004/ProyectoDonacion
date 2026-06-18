import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardComponent } from '../../../shared/components/card/card';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models';
import { CategoriaDialogComponent, CategoriaDialogData } from './categoria-modal';
import { Alerts } from '../../../shared/notifications/alerts';
import { ScreenService } from '../../../shared/services/screen.service';
import { ModalConfig } from '../../../shared/models';

@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    CardComponent,
  ],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class CategoriaComponent implements OnInit {
  protected dataSource: Categoria[] = [];
  protected displayedColumns: string[] = ['id', 'nombre', 'activo', 'acciones'];
  protected isLoading = signal(false);

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private screenService: ScreenService
  ) { }

  ngOnInit(): void {
    this.onCargarDatos();
  }

  onCargarDatos(): void {
    this.isLoading.set(true);
    this.categoriaService.getCategorias(false)
      .then(response => {
        this.dataSource = response.data;
      })
      .catch(() => {
        Alerts.Error('Error al cargar categorías');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  onShowModal(categoria?: Categoria): void {
    const isMobile = this.screenService.isMobile();
    const isEditing = !!categoria;

    const config: ModalConfig = {
      title: isEditing ? 'Editar Categoría' : 'Nueva Categoría',
      isEditing,
      fullScreen: isMobile,
    };

    const data: CategoriaDialogData = {
      config,
      nombre: categoria?.nombre,
    };

    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: isMobile ? '100%' : '450px',
      maxWidth: isMobile ? '100vw' : '450px',
      height: isMobile ? '100vh' : 'auto',
      maxHeight: isMobile ? '100vh' : 'auto',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((nombre: string | undefined) => {
      if (!nombre) return;

      if (isEditing) {
        this.categoriaService.PutCategoria({ ...categoria!, nombre })
          .then(() => {
            Alerts.Success('Categoría actualizada');
            this.onCargarDatos();
          })
          .catch(() => Alerts.Error('Error al actualizar'));
      } else {
        this.categoriaService.PostCategoria({ id: '', nombre, activo: true })
          .then(() => {
            Alerts.Success('Categoría creada');
            this.onCargarDatos();
          })
          .catch(() => Alerts.Error('Error al crear'));
      }
    });
  }

  onToggleActivo(categoria: Categoria): void {
    this.categoriaService.PatchCategoria(categoria.id)
      .then(() => {
        Alerts.Success(categoria.activo ? 'Categoría desactivada' : 'Categoría activada');
        this.onCargarDatos();
      })
      .catch(() => Alerts.Error('Error al cambiar estado'));
  }
}
