import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumLabel'
})
export class EnumLabelNatationPipe implements PipeTransform {

    private valeurs = [
        { value: 'INSUFFISANT', label: 'Insuffisant' },
        { value: 'PASSABLE', label: 'Passable' },
        { value: 'BIEN', label: 'Bien' },
        { value: 'TRES_BIEN', label: 'Très bien' }
    ];

    private criteres = [
        { value: 'PREMIERE_IMPRESSION', label: 'Première impression (politesse, tenue vestimentaire, …)' },
        { value: 'ECOUTE_REACTIVITE_DYNAMISME', label: 'Écoute, réactivité et dynamisme' },
        { value: 'DEGRE_MOTIVATION', label: 'Degré de motivation' },
        { value: 'COMMUNICATION_NON_VERBALE', label: 'Communication non verbale' },
        { value: 'ADAPTABILITE', label: 'Adaptabilité' }
    ];

    transform(value: string | undefined, type: 'valeurs' | 'criteres'): string {
        if (value === undefined) {
            return '';
        }
        const list = type === 'valeurs' ? this.valeurs : this.criteres;
        const found = list.find(item => item.value === value);

        return found ? found.label : value;
    }
}
