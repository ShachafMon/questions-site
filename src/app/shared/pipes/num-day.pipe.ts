import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numDay'
})
export class NumDayPipe implements PipeTransform {

  transform(day: number): string {
    let dayRes;
    switch (day) {
      case 0:
        dayRes = "Sunday"
        break;
      case 1:
        dayRes = "Monday"
        break;
      case 2:
        dayRes = "Tuesday"
        break;
      case 3:
        dayRes = "Wednesday"
        break;
      case 4:
        dayRes = "Thursday"
        break;
      case 5:
        dayRes = "Friday"
        break;
      case 6:
        dayRes = "Saturday"
        break;
      default:
        dayRes = undefined;
        break;
    }
    return dayRes;
  }

}
