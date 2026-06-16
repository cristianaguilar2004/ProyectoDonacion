export interface AuthUser {
    id:            string;
    nombre:        string;
    email:         string;
    passwordHash:  string;
    rol:           string;
    fechaCreacion: Date;
    activo:        boolean;
}
