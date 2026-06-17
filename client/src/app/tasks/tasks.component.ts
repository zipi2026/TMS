import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe} from '../pipes/filter-pipe';
import { HebrewPipe } from '../pipes/hebrew-pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
// import { HoverHighlightDirective } from '../directive/app-hover-highlight.directive';
import { StatusEnum } from '../model/status-enum';
import { Itask } from '../model/itask';
import { TaskViewMode } from '../model/task-view-mode';
import { TableComponent } from '../table/table.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TasksService } from '../services/http/tasks.service';
import { NEVER, Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [MatFormFieldModule,TaskFormComponent,CommonModule,TableComponent,FilterPipe,HebrewPipe,DashboardComponent,FormsModule,TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private dialog = inject(MatDialog);
  private dialogRef:MatDialogRef<TaskFormComponent>|null=null;
  tasksService=inject(TasksService);
  
  taskList$:Observable<Itask[]>=this.tasksService.getTasks$();
  
  
//   taskList:Itask[]=
//   [
//   {
//     id:"1",
//     name:"משימה 1",
//     description:"במהירות",
//     price:2500,
//     date:"1.5.2026",
//     status:StatusEnum.בתהליך
//   },
//   {
//     id:"2",
//     name:"משימה 2",
//     description:"ביעילות",
//     price:4000,
//     date:"1.2.2026",
//     status:StatusEnum.הושלם
//   },
//   {
//     id:"3",
//     name:"משימה 3",
//     description:"במהירות",
//     price:2500,
//     date:"23.1.2026",
//     status:StatusEnum.מבוטל
//   },
//     {
//     id:"4",
//     name:"משימה 4",
//     description:"במהירות",
//     price:2500,
//     date:"1.5.2026",
//     status:StatusEnum.בתהליך
//   },
//   {
//     id:"5",
//     name:"משימה 5",
//     description:"ביעילות",
//     price:4000,
//     date:"1.2.2026",
//     status:StatusEnum.הושלם
//   },
//   {
//     id:"6",
//     name:"משימה 6",
//     description:"במהירות",
//     price:2500,
//     date:"23.1.2026",
//     status:StatusEnum.מבוטל
//   },
//     {
//     id:"7",
//     name:"משימה 7",
//     description:"במהירות",
//     price:2500,
//     date:"23.1.2026",
//     status:StatusEnum.מבוטל
//   },
//     {
//     id:"8",
//     name:"משימה 8",
//     description:"במהירות",
//     price:2500,
//     date:"23.1.2026",
//     status:StatusEnum.מבוטל
//   }
// ]
status=-1
viewState=TaskViewMode.Dashboard
theStateEnum=TaskViewMode
changeState=()=>{
  this.viewState===this.theStateEnum.Table?this.viewState=this.theStateEnum.Dashboard:this.viewState=this.theStateEnum.Table
}
addTask(){
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      disableClose: false,
        data: { task: null }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      this.dialogRef = null;
    });
  }
}
