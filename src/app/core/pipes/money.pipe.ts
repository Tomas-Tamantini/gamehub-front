import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number, format = ''): string {
    const absValue = Math.abs(value);
    const integral = Math.floor(absValue / 100);
    const cents = absValue % 100;
    const centsString = cents < 10 ? `0${cents}` : `${cents}`;
    let sign = '';
    if (value < 0) sign = '-';
    else if (value > 0 && format !== 'noSign') sign = '+';
    return `${sign}$${integral}.${centsString}`;
  }

}
