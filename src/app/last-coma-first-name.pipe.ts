import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'lastComaFirstName'
})
export class LastComaFirstNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value === null ? '' : value.lastName + ', ' + value.firstName;
  }
}
