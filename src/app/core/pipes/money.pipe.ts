import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number): string {
    const stringValue = Math.abs(value).toFixed(2);
    if (stringValue === '0.00') {
      return '$0.00';
    } else if (value > 0) {
      return `+$${stringValue}`;
    } else {
      return `-$${stringValue}`;
    }
  }

}
