import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgSelectComponent} from "@ng-select/ng-select";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TacheService} from "@/app/services/tache/tache.service";
import {Alertes} from "@/app/util/alerte";

@Component({
    selector: 'app-form-tache',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        NgSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './form-tache.component.html',
    styleUrl: './form-tache.component.scss'
})
export class FormTacheComponent implements OnInit {

    form!: FormGroup;
    @Output() submit: EventEmitter<boolean> = new EventEmitter();
    @Output() search: EventEmitter<any> = new EventEmitter();
    @Input() tacheToUpdate: any;
    @Input() isSearch: boolean = false;
    @Input() activityId: any;
    @Input() indicatorId: any;
    @Input() label: string = 'Enregistrer';
    @Input() modal!: NgbModalRef;

    moisDisponibles: any[] = [];
    semainesDisponibles: any[] = [
        { value: 1, label: 'Semaine 1' },
        { value: 2, label: 'Semaine 2' },
        { value: 3, label: 'Semaine 3' },
        { value: 4, label: 'Semaine 4' }
    ];

    allMois: any[] = [
        { value: 1, label: 'Janvier' }, { value: 2, label: 'Février' }, { value: 3, label: 'Mars' },
        { value: 4, label: 'Avril' }, { value: 5, label: 'Mai' }, { value: 6, label: 'Juin' },
        { value: 7, label: 'Juillet' }, { value: 8, label: 'Août' }, { value: 9, label: 'Septembre' },
        { value: 10, label: 'Octobre' }, { value: 11, label: 'Novembre' }, { value: 12, label: 'Décembre' }
    ];

    statutOptions = [
        { value: 'PLANIFIE', label: 'Planifié' },
        { value: 'EN_COURS', label: 'En cours' },
        { value: 'TERMINE', label: 'Terminé' }
    ];

    constructor(private readonly tacheService: TacheService) {}

    ngOnInit(): void {
        this.initializeForm();
        this.loadFields();
    }

    initializeForm(): void {
        const validators = this.isSearch ? [] : [Validators.required];

        this.form = new FormGroup({
            trimestre: new FormControl(null, validators),
            mois: new FormControl(null, validators),
            dateDebut: new FormControl(null, validators),
            dateFin: new FormControl(null, validators),
            statut: new FormControl('PLANIFIE', this.isSearch ? [] : validators),
            semaines: new FormControl([]),
            commentaire: new FormControl(null)
        });
    }

    loadFields(): void {
        if (this.tacheToUpdate) {
            this.form.patchValue({
                trimestre: this.tacheToUpdate.trimestre,
                mois: this.tacheToUpdate.mois,
                dateDebut: this.formatDateForInput(this.tacheToUpdate.dateDebut),
                dateFin: this.formatDateForInput(this.tacheToUpdate.dateFin),
                statut: this.tacheToUpdate.statut || 'PLANIFIE',
                semaines: this.tacheToUpdate.semaines || [],
                commentaire: this.tacheToUpdate.commentaire
            });
            this.onTrimestreChange();
        }
    }

    formatDateForInput(date: any): string | null {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }

    onTrimestreChange(): void {
        const trimestre = this.form.get('trimestre')?.value;
        if (trimestre) {
            const ranges: any = {
                1: [1, 2, 3],
                2: [4, 5, 6],
                3: [7, 8, 9],
                4: [10, 11, 12]
            };
            const moisRange = ranges[trimestre] || [];
            this.moisDisponibles = this.allMois.filter(m => moisRange.includes(m.value));
        } else {
            this.moisDisponibles = [];
        }
    }

    save(): void {
        if (!this.form.valid) {
            Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires');
            return;
        }

        const tache = {
            activiteId: this.activityId,
            indicatorId: this.indicatorId,
            trimestre: this.form.value.trimestre,
            mois: this.form.value.mois,
            dateDebut: this.form.value.dateDebut,
            dateFin: this.form.value.dateFin,
            statut: this.form.value.statut,
            semaines: this.form.value.semaines || [],
            commentaire: this.form.value.commentaire
        };

        if (this.tacheToUpdate) {
            this.update(tache);
        } else {
            this.create(tache);
        }
    }

    create(tache: any): void {
        this.tacheService.createTache(tache).subscribe({
            next: () => {
                Alertes.alerteAddSuccess('Tâche ajoutée avec succès');
                this.close();
            },
            error: (error) => {
                Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue lors de la création');
            }
        });
    }

    update(tache: any): void {
        this.tacheService.updateTache(this.tacheToUpdate.id, tache).subscribe({
            next: () => {
                Alertes.alerteUpdateSuccess('Tâche mise à jour avec succès');
                this.close();
            },
            error: (error) => {
                Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue lors de la mise à jour');
            }
        });
    }

    doSearch(): void {
        this.search.emit(this.form.value);
    }

    reset(): void {
        this.form.reset({
            statut: this.isSearch ? null : 'PLANIFIE',
            semaines: []
        });
        if (this.isSearch) {
            this.doSearch();
        }
    }

    close(): void {
        this.submit.emit(true);
        if (this.modal) {
            this.modal.close();
        }
    }
}
