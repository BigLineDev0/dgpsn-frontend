import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceLabel',
  standalone: true,
})
export class ExperienceLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const map: Record<string, string> = {
      'UN_AN': '1 an',
      'DEUX_ANS': '2 ans',
      'TROIS_ANS': '3 ans',
      'QUATRE_ANS': '4 ans',
      'CINQ_ANS': '5 ans',
      'PLUS_DE_CINQ_ANS': '+ 5 ans',
    };

    return map[value] || value;
  }
}
