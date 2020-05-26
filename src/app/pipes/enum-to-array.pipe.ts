import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform<E>(value): object {
    return Object.keys(value)
      .map(o => {
        return { index: +o, name: value[o] };
      });
  }
}
