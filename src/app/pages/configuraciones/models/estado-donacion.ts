export interface EstadoDonacion {
    descripcion: string;
    id: string;
    usuarioAgrega: string;
    fechaCreacion: Date;
    usuarioModifica: null | string;
    fechaModifica: null | Date;
    activo: boolean;
}
