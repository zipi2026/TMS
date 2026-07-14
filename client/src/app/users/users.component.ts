import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../services/http/users.service';
import { IUser } from '../model/user';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule,
    MatTooltipModule, MatCardModule, MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {
  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  dataSource = new MatTableDataSource<IUser>([]);
  displayedColumns: string[] = ['userId', 'userName', 'email', 'phone', 'roleId', 'actions'];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers$().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('שגיאה בטעינת משתמשים', 'סגור', { duration: 3000 });
      }
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: IUser): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${user.userName}"?`)) {
      this.usersService.deleteUser$(user.userId).subscribe({
        next: () => {
          this.snackBar.open(`המשתמש "${user.userName}" נמחק בהצלחה`, 'סגור', { duration: 3000 });
          this.loadUsers();
        },
        error: () => {
          this.snackBar.open('שגיאה במחיקת משתמש', 'סגור', { duration: 3000 });
        }
      });
    }
  }

  getRoleName(roleId: number): string {
    return roleId === 2 ? 'מנהל' : 'רגיל';
  }
}
