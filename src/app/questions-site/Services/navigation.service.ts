import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private route: Router) {
    }

    navigateTo(url: string) {
        this.route.navigateByUrl(url);
    }

}
