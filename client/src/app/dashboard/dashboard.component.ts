import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itask } from '../model/itask';
import { StatusEnum } from '../model/status-enum';
import { TaskComponent } from '../task/task.component';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIcon, TaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @Input() taskList: Itask[] = [];
  trackById(index: number, item: Itask) {
  return item.taskId;
}

  get totalTasks(): number {
    return this.taskList.length;
  }

  get completedTasks(): number {
    return this.taskList.filter(t => t.status === StatusEnum.הושלם).length;
  }

  get inProgressTasks(): number {
    return this.taskList.filter(t => t.status === StatusEnum.בתהליך).length;
  }
}
