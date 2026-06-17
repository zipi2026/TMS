import { Component } from '@angular/core';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HebrewPipe } from '../pipes/hebrew-pipe';
import { StatusEnum } from '../model/status-enum';

@Component({
  selector: 'app-status',
  imports: [HebrewPipe,MatTooltipModule,MatIconModule,CommonModule,StatusIconPipe,FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  theStatusEnum=StatusEnum;
  private _status=StatusEnum.בתהליך

statusArray=[0,1,2,3];
}
