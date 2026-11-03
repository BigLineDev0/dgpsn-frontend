import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(value: number, format: string = 'yyyy-MM-dd'): string {
    if (!value) return '';
    return new Date(value).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
}
