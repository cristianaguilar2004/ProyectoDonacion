import { Categoria, EstadoArticulo, Sucursal, EstadoDonacion } from "../../configuraciones/models";

export interface Donacion {
    nombreArticulo:      string;
    descripcionArticulo: string;
    categoriaId:         string;
    estadoArticuloId:    string;
    estadoDonacionId:    string;
    sucursalId:          string;
    urlImagen:           string;
    categoria:           Categoria | null;
    estadoArticulo:      EstadoArticulo | null;
    estadoDonacion:      EstadoDonacion | null;
    sucursal:            Sucursal | null;
    id:                  string;
    usuarioAgrega:       null;
    fechaCreacion:       Date;
    usuarioModifica:     null;
    fechaModifica:       null;
    activo:              boolean;
}

