import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StatusEnum } from '../model/status-enum';
import { Itask } from '../model/itask';
import { TasksService } from '../services/http/tasks.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  StatusEnum = StatusEnum;
  formGroup: FormGroup = new FormGroup({});
  private formBuilder = inject(FormBuilder);
  private tasksService = inject(TasksService);
  readonly startDate = new Date();
  isNew = true;
  task: Itask = {} as Itask;
  readonly statusOptions = [
    { value: StatusEnum.ממתין, label: 'ממתין' },
    { value: StatusEnum.בתהליך, label: 'בתהליך' },
    { value: StatusEnum.הושלם, label: 'הושלם' },
    { value: StatusEnum.מבוטל, label: 'מבוטל' },
  ];

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.task = this.data?.task ?? ({} as Itask);
    this.isNew = !this.task || Object.keys(this.task).length === 0 || !this.task.taskId;

    this.formGroup = this.formBuilder.group({
      taskId: [this.task?.taskId ?? null],
      name: [this.task?.name ?? '', Validators.required],
      description: [this.task?.description ?? '', Validators.required],
      price: [this.task?.price ?? 1500, [Validators.required, Validators.min(1500)]],
      scheduling: [this.task?.scheduling ? new Date(this.task.scheduling) : new Date(), Validators.required],
      status: [this.task?.status ?? StatusEnum.ממתין, Validators.required],
    });
  }

  saveTask(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const formValue = this.formGroup.getRawValue();
    const payload = {
      taskId: formValue.taskId ?? 0,
      name: formValue.name,
      description: formValue.description,
      price: Number(formValue.price),
      scheduling: formValue.scheduling,
      status: Number(formValue.status),
    } as Itask;

    const request$ = this.isNew ? this.tasksService.addTask$(payload) : this.tasksService.updateTask$(payload);

    request$.subscribe({
      next: () => this.dialogRef.close({ success: true, task: payload }),
      error: () => this.dialogRef.close({ success: false, error: 'הפעולה נכשלה. נסה שוב.' }),
    });
  }

  cancel(): void {
    this.dialogRef.close({ success: false });
  }
}
