import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate{


    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        
        const isLoggedIn = this.checkUserInLocalStorage();
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        } else {
            
         }
        return isLoggedIn;

    }
    checkUserInLocalStorage(): boolean {
        const userJson = localStorage.getItem('user');
        if (!userJson) {
            return false; // לא קיים בכלל
        }
        try {
            const user = JSON.parse(userJson);

            // בדיקה האם האובייקט מכיל את השדות name ו-role
            if (user && typeof user === 'object' && 'username' in user && 'password' in user) {
            // אפשר גם לבדוק אם הם מחרוזות:
                if (typeof user.username === 'string' && typeof user.password === 'string') {
                    return true;
                }      
            }
        } catch (e) {
            console.error('Invalid JSON in localStorage for key "user"', e);
        }

        return false;
    }}
