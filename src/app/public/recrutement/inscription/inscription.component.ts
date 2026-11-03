import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class InscriptionComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    typeContrats = [
        { name: 'CDD', description: 'CDD' },
        { name: 'INTERIM', description: 'Interim' },
        { name: 'CDI', description: 'CDI' },
        { name: 'CONTRAT_APRENTISSAGE', description: "Contrat d'apprentissage" },
        { name: 'CONTRAT_ENGAGEMENT_ESSAI', description: "Contrat d'engagement à l'essai" }
    ];
    caracteristiques = [
        { id: 1, nameCat: 'NDE', libelle: 'BFEM' },
        { id: 2, nameCat: 'NDE', libelle: 'BAC' },
        { id: 3, nameCat: 'NDE', libelle: 'BAC+2' },
        { id: 4, nameCat: 'NDE', libelle: 'Licence' },
        { id: 5, nameCat: 'NDE', libelle: 'Master I' },
        { id: 6, nameCat: 'NDE', libelle: 'Master II' },
        { id: 7, nameCat: 'NDE', libelle: 'Doctorat' },
        { id: 8, nameCat: 'NDE', libelle: 'Maitrise' },
        { id: 9, nameCat: 'EXP', libelle: '1 an' },
        { id: 10, nameCat: 'EXP', libelle: '2 ans' },
        { id: 11, nameCat: 'EXP', libelle: '3 ans' },
        { id: 12, nameCat: 'EXP', libelle: '4 ans' },
        { id: 13, nameCat: 'EXP', libelle: '5 ans' },
        { id: 14, nameCat: 'EXP', libelle: '+ 5 ans' }
    ];
    categorieCaracteristiques = [
        { id: 1, categorieName: 'NDE', libelle: 'Niveau d\'étude' },
        { id: 2, categorieName: 'EXP', libelle: 'Expérience professionnelle' }
    ];
    filteredCaracteristiques: any[] = [];

    ngOnInit() {
        this.initForm();
        this.addCharacteristic();
    }

    initForm() {
        this.form = new FormGroup({
            libelle: new FormControl('', Validators.required),
            dateLimite: new FormControl(''),
            typeContrat: new FormControl(''),
            characteristics: new FormArray([])
        });
        this.filteredCaracteristiques.push([]);
    }

    get characteristics(): FormArray {
        return this.form.get('characteristics') as FormArray;
    }

    addCharacteristic() {
        this.characteristics.push(new FormGroup({
            categorieCaracteristique: new FormControl('', Validators.required),
            caracteristique: new FormControl('', Validators.required),
            exige: new FormControl(false)
        }));
        this.filteredCaracteristiques.push([]);
    }

    removeCharacteristic(index: number) {
        this.characteristics.removeAt(index);
        this.filteredCaracteristiques.splice(index, 1);
    }

    onCategorieChange(event: Event, index: number) {
        const categorieName = (event.target as HTMLSelectElement).value;
        this.filteredCaracteristiques[index] = this.caracteristiques.filter(
            item => item.nameCat === categorieName
        );
        this.characteristics.at(index).get('caracteristique')?.setValue('');
    }

    save() {
        if (this.form.valid) {
            this.loading = true;
            setTimeout(() => {
                console.log('Form data:', this.form.value);
                this.loading = false;
                alert('Données enregistrées avec succès !');
                this.resetForm();
            }, 1000);
        }
    }

    resetForm() {
        this.form.reset();
        this.characteristics.clear();
        this.filteredCaracteristiques = [];
        this.addCharacteristic();
    }
}