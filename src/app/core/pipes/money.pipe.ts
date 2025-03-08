import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0) return '$0.00';
    const absValue = Math.abs(value);
    const integral = Math.floor(absValue / 100);
    const cents = absValue % 100;
    const centsString = cents < 10 ? `0${cents}` : `${cents}`;
    const sign = value > 0 ? '+' : '-';
    return `${sign}$${integral}.${centsString}`;
  }

}
