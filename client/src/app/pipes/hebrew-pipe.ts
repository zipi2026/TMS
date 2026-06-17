import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hebrew'
})
export class HebrewPipe implements PipeTransform {

  transform(value: number,...args:unknown[]): string {
    switch(value){
      case 2:
      return 'הושלם'
      break;
      case 0:
      return 'ממתיו'
      break;
      case 1:
      return 'בתהליך'
      break;
      case 3:
      return 'מבוטל'
      break;
      case -1:
      return 'הכל'
      break;
      default:
      return 'הכל'
      break;
    }
    return ""
  }

}
