import { Component, Input } from '@angular/core';
import { Itask } from '../model/itask';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { StatusEnum } from '../model/status-enum';

@Component({
  selector: 'app-task',
  imports: [CommonModule, MatIconModule, StatusIconPipe, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task: Itask = {} as Itask;

  get statusClass(): string {
    switch (this.task.status) {
      case StatusEnum.הושלם: return 'done';
      case StatusEnum.בתהליך: return 'in-progress';
      case StatusEnum.ממתין: return 'pending';
      case StatusEnum.מבוטל: return 'cancelled';
      default: return '';
    }
  }

  get statusLabel(): string {
    switch (this.task.status) {
      case StatusEnum.הושלם: return 'הושלם';
      case StatusEnum.בתהליך: return 'בתהליך';
      case StatusEnum.ממתין: return 'ממתין';
      case StatusEnum.מבוטל: return 'מבוטל';
      default: return '';
    }
  }
}
