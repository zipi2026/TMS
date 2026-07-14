import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser } from '../model/user';
import { AuthService } from './http/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private authService = inject(AuthService);

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser | null> = this.currentUserSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user?.roleId === 2)
  );

  private sessionCheckedSubject = new BehaviorSubject<boolean>(false);
  sessionChecked$: Observable<boolean> = this.sessionCheckedSubject.asObservable();

  get currentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  get isSessionChecked(): boolean {
    return this.sessionCheckedSubject.value;
  }

  constructor() {
    // Restore user from localStorage immediately (synchronous, no server needed)
    this.restoreFromLocalStorage();
    // Session restore is called from APP_INITIALIZER after config is loaded
  }

  /** Sync restore from localStorage — no server needed, instant */
  private restoreFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const user: IUser = JSON.parse(stored);
        if (user?.userName) {
          this.currentUserSubject.next(user);
        }
      }
    } catch {
      // ignore corrupt localStorage
    }
  }

  /** Persist user to localStorage */
  private saveToLocalStorage(user: IUser): void {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch {
      // ignore storage errors
    }
  }

  /** Remove user from localStorage */
  private clearLocalStorage(): void {
    try {
      localStorage.removeItem('currentUser');
    } catch {
      // ignore
    }
  }

  restoreSession(): void {
    if (this.sessionCheckedSubject.value) return; // already checked

    this.authService.getSession$().subscribe({
      next: (user) => {
        this.saveToLocalStorage(user);
        this.currentUserSubject.next(user);
        this.sessionCheckedSubject.next(true);
      },
      error: () => {
        // Server is down or session expired.
        // If we already have a user from localStorage, keep it — don't kick the user out.
        const localUser = this.currentUserSubject.value;
        if (localUser) {
          // User was previously logged in, server is just down — keep them logged in.
          console.warn('Server unavailable — keeping local session');
        } else {
          // No local session at all — user is genuinely not logged in.
          this.currentUserSubject.next(null);
        }
        this.sessionCheckedSubject.next(true);
      }
    });
  }

  login(userName: string, password: string): Observable<IUser> {
    return new Observable<IUser>(subscriber => {
      this.authService.login$({ userName, password }).subscribe({
        next: (user) => {
          this.saveToLocalStorage(user);
          this.currentUserSubject.next(user);
          subscriber.next(user);
          subscriber.complete();
        },
        error: (err) => subscriber.error(err)
      });
    });
  }

  logout(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.authService.logout$().subscribe({
        next: () => {
          this.clearLocalStorage();
          this.currentUserSubject.next(null);
          subscriber.next();
          subscriber.complete();
        },
        error: () => {
          // Even if server fails, logout locally
          this.clearLocalStorage();
          this.currentUserSubject.next(null);
          subscriber.next();
          subscriber.complete();
        }
      });
    });
  }
}
