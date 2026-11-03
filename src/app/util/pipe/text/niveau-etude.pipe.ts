import { Pipe, PipeTransform } from '@angular/core';

export enum NiveauEtude {
  BFEM = 'BFEM',
  BAC = 'BAC',
  BAC_PLUS_2 = 'BAC+2',
  LICENCE = 'Licence',
  MASTER_I = 'Master I',
  MASTER_II = 'Master II',
  DOCTORAT = 'Doctorat',
  MAITRISE = 'Maîtrise'
}

@Pipe({
  name: 'niveauEtude'
})
export class NiveauEtudePipe implements PipeTransform {

  private labels: Record<string, string> = {
    BFEM: 'BFEM',
    BAC: 'BAC',
    'BAC+2': 'BAC+2',
    LICENCE: 'Licence',
    MASTER_I: 'Master I',
    MASTER_II: 'Master II',
    DOCTORAT: 'Doctorat',
    MAITRISE: 'Maîtrise'
  };

  transform(value: string | NiveauEtude | null | undefined): string {
    if (!value) return '';
    return this.labels[value] ?? value;
  }

}
