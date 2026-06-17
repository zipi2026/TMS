// This is FilterTasksPipe

import { Pipe, PipeTransform } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Itask } from '../model/itask';
import { StatusEnum } from '../model/status-enum';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks:Itask[],status:StatusEnum): Itask[] {
    if(!tasks||!status||status==-1)
      return tasks;
    return tasks.filter(task=>task.status==status);
  }

}
