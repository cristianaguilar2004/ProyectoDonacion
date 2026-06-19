import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DonacionService } from '../services/donacion.service';
import { SucursalService } from '../../configuraciones/services/sucursal.service';
import { EstadoArticuloService } from '../../configuraciones/services/estado-articulo.service';
import { CategoriaService } from '../../configuraciones/services/categoria.service';
import { Sucursal, EstadoArticulo, Categoria } from '../../configuraciones/models';
import { Alerts } from '../../../shared/notifications/alerts';
import { CardComponent } from '../../../shared/components/card/card';

@Component({
  selector: 'app-crear-donacion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CardComponent,
  ],
  templateUrl: './crear-donacion.html',
  styleUrl: './crear-donacion.css',
})
export class CrearDonacion implements OnInit {
  protected form!: FormGroup;
  protected isLoading = signal(false);
  protected isSubmitting = signal(false);

  protected sucursales: Sucursal[] = [];
  protected estadosArticulo: EstadoArticulo[] = [];
  protected categorias: Categoria[] = [];

  protected selectedFile: File | null = null;
  protected previewUrl: string | null = null;
  protected isImageLoading = signal(false);
  protected readonly maxFileSize = 5 * 1024 * 1024; // 5 MB

  constructor(
    private donacionService: DonacionService,
    private sucursalService: SucursalService,
    private estadoArticuloService: EstadoArticuloService,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onInitForm();
    this.onCargarCatalogos();
  }

  onInitForm(): void {
    this.form = new FormGroup({
      nombreArticulo: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
      descripcionArticulo: new FormControl<string | null>(null, [Validators.required, Validators.minLength(10)]),
      sucursalId: new FormControl<string | null>(null, [Validators.required]),
      estadoArticuloId: new FormControl<string | null>(null, [Validators.required]),
      categoriaId: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  onCargarCatalogos(): void {
    this.isLoading.set(true);

    Promise.all([
      this.sucursalService.getSucursales(true),
      this.estadoArticuloService.getEstadosArticulo(true),
      this.categoriaService.getCategorias(true),
    ])
      .then(([sucRes, estRes, catRes]) => {
        this.sucursales = sucRes.data;
        this.estadosArticulo = estRes.data;
        this.categorias = catRes.data;
      })
      .catch(() => {
        Alerts.Error('Error al cargar catálogos');
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      Alerts.Warning('Solo se permiten imágenes');
      input.value = '';
      return;
    }

    if (file.size > this.maxFileSize) {
      Alerts.Warning('La imagen no debe superar los 5 MB');
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.isImageLoading.set(true);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.isImageLoading.set(false);
    };
    reader.onerror = () => {
      this.isImageLoading.set(false);
      Alerts.Error('Error al cargar la imagen');
    };
    reader.readAsDataURL(file);
  }

  onRemoveImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    Alerts.Loading('Creando donación...');

    const formData = new FormData();

    const donacionData = {
      nombreArticulo: this.form.value.nombreArticulo,
      descripcionArticulo: this.form.value.descripcionArticulo,
      sucursalId: this.form.value.sucursalId,
      estadoArticuloId: this.form.value.estadoArticuloId,
      categoriaId: this.form.value.categoriaId,
    };

    formData.append('datos', JSON.stringify(donacionData));

    if (this.selectedFile) {
      formData.append('urlImagen', this.selectedFile, this.selectedFile.name);
    }

    this.donacionService.postDonacion(formData)
      .then((response) => {
        Alerts.Success(response.message || 'Donación creada exitosamente');
        this.onInitForm();
        this.onRemoveImage();
        this.router.navigate(['/donaciones/disponibles']);
      })
      .catch((error) => {
        Alerts.Error(error?.error?.message || 'Error al crear la donación');
      })
      .finally(() => {
        this.isSubmitting.set(false);
      });
  }
}
