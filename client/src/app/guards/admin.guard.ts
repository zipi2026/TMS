import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private authState = inject(AuthStateService);
  private router = inject(Router);

  canActivate() {
    return this.authState.isAdmin$.pipe(
      take(1),
      map(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/main/tasks']);
          return false;
        }
        return true;
      })
    );
  }
}
