import { AuthUser } from "../../auth/models";

export interface Solicitud {
    donacionId:      string;
    aceptada:        boolean;
    solicitante:     AuthUser | null;
    id:              string;
    usuarioAgrega:   string;
    fechaCreacion:   Date;
    usuarioModifica: null | string;
    fechaModifica:   null | Date;
    activo:          boolean;
}
