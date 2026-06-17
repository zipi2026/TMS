import { Pipe, PipeTransform } from '@angular/core';
import { StatusEnum } from '../model/status-enum';

@Pipe({
  name: 'statusIcon'
})
export class StatusIconPipe implements PipeTransform {

  transform(value: number): string {
    switch(value){
      case 2:
        return 'check';
        break;
      case 0:
        return 'hourglass_empty';
        break;
      case 1:
        return 'hourglass_top';
        break;
      case 3:
        return 'cancel';
        break;
      default:
        return 'question';
    }
    return ''
  }

}
