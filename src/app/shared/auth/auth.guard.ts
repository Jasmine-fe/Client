import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './authJWT.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) { }

    canActivate(): boolean {
        // console.log("canActivate")
        // console.log("localStorage", localStorage.getItem('currentUser'))
        // if (localStorage.getItem('currentUser')) {
        //     // logged in so return true
        //     return true;
        // }
        // // not logged in so redirect to login page
        // this.router.navigate(['/login/user'], { queryParams: { returnUrl: state.url } });
        // return false;

        // return localStorage.getItem('currentUser')? true: this.router.navigate(['/login/user']);
        // return this.authService.isAuthenticated()? true: false;
        if(!this.authService.isAuthenticated()) {
            this.router.navigate(['/login/user']);
            return false;
        }
        return true;
    }
}

