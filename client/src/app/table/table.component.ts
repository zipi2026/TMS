import { Component,inject,Input, OnInit,OnChanges, SimpleChanges} from '@angular/core';
import { Itask } from '../model/itask';
import { HebrewPipe} from '../pipes/hebrew-pipe';
import{MatTableModule} from'@angular/material/table'
import { CommonModule } from '@angular/common';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-table',
  imports: [TaskFormComponent,HebrewPipe,MatTableModule,CommonModule,StatusIconPipe,MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit,  OnChanges{
  private dialog=inject(MatDialog);
  private dialogRef:MatDialogRef<TaskFormComponent>|null=null;
  // @Input()taskList:Itask[]=[];
  @Input() taskList :Itask[]= [];
  columns:string[]=[]
  ngOnInit(){
  }
  ngOnChanges(changes: SimpleChanges): void {
    const {taskList}=changes
    if(taskList){
      if(this.taskList&&this.taskList.length){
        this.columns=[...Object.keys(this.taskList[0])]
        this.columns.push("UPDATE")
      }
    }
  }
  changeTask(task:Itask){
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
      disableClose: false,
        data: { task }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה
    });  }
    // changeTask(task:Itask){
    //   this.tasks.addTask(task)
    // }
}
