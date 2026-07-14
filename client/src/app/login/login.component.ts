import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthStateService } from '../services/auth-state.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, CommonModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  authState = inject(AuthStateService);

  formGroup: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { userName, password } = this.formGroup.value;

    this.authState.login(userName, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.error || 'שגיאה בהתחברות, אנא נסה שוב';
      }
    });
  }
}
