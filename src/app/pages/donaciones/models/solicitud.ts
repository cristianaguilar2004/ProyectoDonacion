import { AuthUser } from "../../auth/models";

export interface Solicitud {
    donacionId:      string;
    aceptada:        boolean;
    entregada:       boolean;
    fechaEntrega:    null | Date;
    fechaAceptada:   null | Date;
    solicitante:     AuthUser | null;
    id:              string;
    usuarioAgrega:   string;
    fechaCreacion:   Date;
    usuarioModifica: null | string;
    fechaModifica:   null | Date;
    activo:          boolean;
}
