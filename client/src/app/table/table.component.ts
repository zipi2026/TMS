import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Itask } from '../model/itask';
import { HebrewPipe } from '../pipes/hebrew-pipe';
import { StatusIconPipe } from '../pipes/status-icon.pipe';

@Component({
  selector: 'app-table',
  imports: [
    HebrewPipe, MatDialogModule, MatTableModule, CommonModule,
    StatusIconPipe, MatIconModule, MatButtonModule, MatTooltipModule,
    MatCardModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  private dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<TaskFormComponent> | null = null;
  @Input() taskList: Itask[] = [];
  @Output() taskChanged = new EventEmitter<void>();
  columns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { taskList } = changes;
    if (taskList && this.taskList?.length) {
      this.columns = [...Object.keys(this.taskList[0]), 'UPDATE'];
    }
  }

  changeTask(task: Itask): void {
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '760px',
      disableClose: false,
      data: { task },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.taskChanged.emit();
      }
      this.dialogRef = null;
    });
  }
}
