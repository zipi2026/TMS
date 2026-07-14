import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { CheckHttpService } from '../services/http/check-http.service';
import { AuthStateService } from '../services/auth-state.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule, RouterModule,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatListModule, MatButtonModule, MatTooltipModule,
    MatDividerModule, MatBadgeModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  authState = inject(AuthStateService);
  connection = inject(CheckHttpService);
  router = inject(Router);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isServerAlive = false;

  ngOnInit(): void {
    this.checkServer();
    setInterval(() => {
      this.checkServer();
    }, 30000);
  }

  checkServer(): void {
    this.connection.check$().pipe(
      tap((result) => this.isServerAlive = !!result)
    ).subscribe({
      next: () => {},
      error: () => { this.isServerAlive = false; }
    });
  }

  logout(): void {
    this.authState.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
