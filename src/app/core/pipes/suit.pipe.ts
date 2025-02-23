import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suit'
})
export class SuitPipe implements PipeTransform {

  transform(value: 'h' | 'd' | 'c' | 's'): string {
    switch (value) {
      case 'h':
        return '♥';
      case 'd':
        return '♦';
      case 'c':
        return '♣';
      case 's':
        return '♠';
      default:
        return '';
    }
  }

}
