export interface Notificacion {
    usuarioId:       string;
    mensaje:         string;
    leida:           boolean;
    id:              string;
    usuarioAgrega:   string;
    fechaCreacion:   Date;
    usuarioModifica: string | null;
    fechaModifica:   Date | null;
    activo:          boolean;
}
