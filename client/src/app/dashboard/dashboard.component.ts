import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Itask } from '../model/itask';
import { StatusEnum } from '../model/status-enum';
import { HebrewPipe } from '../pipes/hebrew-pipe';
import { appoverhighlight } from '../directive/appoverhilight.directive';
import { FilterPipe } from '../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
// import { TasksComponent } from '../tasks/tasks.component';
import { TaskViewMode } from '../model/task-view-mode';
// import { HoverHighlightDirective } from '../directive/app-hover-highlight.directive';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,HebrewPipe,FormsModule,TaskComponent,FilterPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @Input()taskList:Itask[]=[];
  
}
