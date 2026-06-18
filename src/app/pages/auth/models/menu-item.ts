export interface MenuItem {
  id: number;
  label: string;
  icon: string;
  ruta: string;
  hijos?: MenuItem[];
}