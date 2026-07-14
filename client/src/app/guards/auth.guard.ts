import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { filter, map, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authState = inject(AuthStateService);
  private router = inject(Router);

  canActivate() {
    // Wait until the session check completes before deciding
    return this.authState.sessionChecked$.pipe(
      filter(checked => checked), // wait for session check to finish
      take(1),
      switchMap(() => this.authState.isLoggedIn$.pipe(take(1))),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
