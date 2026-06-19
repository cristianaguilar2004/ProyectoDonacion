import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './navbar/navbar';
import { SidebarComponent } from './sidebar/sidebar';
import { FooterComponent } from './footer/footer';
import { RoleService } from '../auth/services';
import { MenuItem } from '../auth/models';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatSidenavModule,
        MatProgressSpinnerModule,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
    ],
    templateUrl: './layout.html',
    styleUrl: './layout.css',
})
export class LayoutComponent implements OnInit {
    protected menuItems: MenuItem[] = [];

    constructor(private cdr: ChangeDetectorRef, private roleService: RoleService) { }

    ngOnInit(): void {
        this.onCargoMenu();
    }

    onCargoMenu(): void {
        this.roleService.loadMenu().then(() => {
            this.menuItems = this.roleService.menuItems;
            this.cdr.detectChanges();
        });
    }


}
