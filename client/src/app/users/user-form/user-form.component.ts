import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/http/users.service';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatSnackBarModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  private dialogRef = inject(MatDialogRef<UserFormComponent>);
  private usersService = inject(UsersService);
  private snackBar = inject(MatSnackBar);

  formGroup: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.email]],
      phone: [''],
      roleId: [1, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.usersService.addUser$(this.formGroup.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('המשתמש נוסף בהצלחה', 'סגור', { duration: 3000 });
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.error || 'שגיאה בהוספת משתמש';
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
