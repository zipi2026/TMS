import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurationService } from '../services/configuration.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Itask } from '../model/itask';
import { TaskViewMode } from '../model/task-view-mode';
import { FilterPipe } from '../pipes/filter-pipe';
import { TableComponent } from '../table/table.component';
import { TasksService } from '../services/http/tasks.service';
import { ChatComponent } from '../chat/chat.component';
import { StatusEnum } from '../model/status-enum';

@Component({
  selector: 'app-tasks',
  imports: [
    MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatCardModule, MatTooltipModule, MatButtonToggleModule,
    ChatComponent, MatDialogModule, CommonModule, TableComponent,
    FilterPipe, DashboardComponent, FormsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<TaskFormComponent> | null = null;
  private tasksService = inject(TasksService);
  private configurationService = inject(ConfigurationService);

  taskList$: Observable<Itask[]> = this.tasksService.getTasks$();
  status = -1;
  viewState = TaskViewMode.Dashboard;
  importantMessageDate = '';
  TasksThatEnd: string[] = [];
  theStateEnum = TaskViewMode;
  ViewMode = TaskViewMode;
  statusList = Object.keys(StatusEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value: StatusEnum[key as keyof typeof StatusEnum]
    }));
  @ViewChild(ChatComponent) myChatRef: ChatComponent = {} as ChatComponent;

  constructor() {
    this.configurationService.messageEvent.subscribe((message) => {
      try {
        const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
        if (parsedMessage?.userName || parsedMessage?.message) {
          this.showMessage(parsedMessage);
        }
      } catch {
        console.warn('Received invalid chat message payload', message);
      }
    });

    this.configurationService.importantEvent.subscribe((message) => {
      try {
        const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
        if (parsedMessage?.name || parsedMessage?.date) {
          this.showImportantMessage(parsedMessage);
        }
      } catch {
        console.warn('Received invalid important message payload', message);
      }
    });
  }

  changeState(): void {
    this.viewState = this.viewState === this.theStateEnum.Table
      ? this.theStateEnum.Dashboard
      : this.theStateEnum.Table;
  }

  loadTasks(): void {
    this.taskList$ = this.tasksService.getTasks$();
  }

  addTask(): void {
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '680px',
      disableClose: false,
      data: { task: null },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadTasks();
      }
      this.dialogRef = null;
    });
  }

  showMessage(userMessage: { userName?: string; message?: string }): void {
    const userName = userMessage?.userName || '';
    const message = userMessage?.message || '';
    this.myChatRef.addMessage(userName, `💬 ${message}`);
  }

  showImportantMessage(serverMessage: { name: string; date: string }): void {
    if (!this.myChatRef) return;
    const { name, date } = serverMessage;
    if (date !== this.importantMessageDate) {
      this.TasksThatEnd = [];
      this.importantMessageDate = date;
    }
    if (!this.TasksThatEnd.includes(name)) {
      this.TasksThatEnd = [...this.TasksThatEnd, name];
      this.myChatRef.addMessage('מנהל המשימות', `💥משימה && ${name} && חייבת להסתיים היום!`);
    }
  }
}
