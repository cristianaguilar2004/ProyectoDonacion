import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {

    readonly isMobile = signal(false);

    constructor() {
        const breakpointObserver = inject(BreakpointObserver);
        breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
            .subscribe(result => this.isMobile.set(result.matches));
    }
}
