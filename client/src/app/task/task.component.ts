import { Component,Input } from '@angular/core';
import { Itask } from '../model/itask';
import { HebrewPipe } from '../pipes/hebrew-pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// import { HoverHighlightDirective } from '../directive/app-hover-highlight.directive';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task',
  imports: [CommonModule,HebrewPipe,MatIconModule,StatusIconPipe,DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()task:Itask={}as Itask;
}
