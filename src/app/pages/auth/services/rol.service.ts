import { Injectable, signal } from '@angular/core';
import { AppService } from '../../../shared/services';
import { MenuItem, Rol } from '../models';
import { ApiResponseData } from '../../../shared/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly menuKey = 'donate-menu';
  private readonly apiUrl = 'roles';

  private _menuItems: MenuItem[] = [];

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) { }

  async loadMenu(): Promise<void> {

    // Try localStorage first
    const cached = localStorage.getItem(this.menuKey);
    if (cached) {
      const parsed: MenuItem[] = JSON.parse(cached);
      if (this.isValidMenu(parsed)) {
        this._menuItems = parsed;
        return;
      }
    }

    // Fetch from API
    await this.appService.get<ApiResponseData<Array<Rol>>>(this.apiUrl)
      .then(response => {
        const rol = this.authService.currentUser()?.role ?? '';
        const foundRol = response.data.find(r => r.id == rol);
        if (foundRol?.menu) {
          const parsed: MenuItem[] = JSON.parse(foundRol.menu);
          this._menuItems = parsed;
          localStorage.setItem(this.menuKey, JSON.stringify(parsed));
        }
      })
      .catch(() => {
        this._menuItems = [];
      });
  }

  private isValidMenu(menu: MenuItem[]): boolean {
    return Array.isArray(menu) && menu.length > 0;
  }
}