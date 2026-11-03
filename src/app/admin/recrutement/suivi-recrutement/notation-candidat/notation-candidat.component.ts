import {Component, effect, EventEmitter, inject, input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {
    NotationDTO,
    NotationService
} from "@/app/services/candidat/NotationService";
import { CandidatDTO } from "@/app/models/candidat.model";
import {forkJoin} from "rxjs";
import {EnumLabelNatationPipe} from "@core/pipe/label.notation.pipe";

@Component({
    selector: 'app-notation-candidat',
    standalone: true,
    imports: [CommonModule, NgSelectModule, FormsModule, EnumLabelNatationPipe],
    templateUrl: './notation-candidat.component.html',
    styleUrls: ['./notation-candidat.component.scss']
})
export class NotationCandidatComponent implements OnInit {
    @Output() submit = new EventEmitter<boolean>();
    candidat = input<CandidatDTO>();
    notationService = inject(NotationService);


    modeEdit = false;
    notations: NotationDTO[] = [];

    valeurs = [
        { value: 'INSUFFISANT', label: 'Insuffisant' },
        { value: 'PASSABLE', label: 'Passable' },
        { value: 'BIEN', label: 'Bien' },
        { value: 'TRES_BIEN', label: 'Très bien' }
    ];


    ngOnInit(): void {
        const data = this.candidat()?.notations ?? [];
        this.notations = [...data]; // clone pour éviter les mutations directes

    }

    switchModeEdit(): void {
        this.modeEdit = !this.modeEdit;
    }

    close(): void {
        this.submit.emit(true);
    }

    saveAll(): void {
        if (!this.candidat()?.id) return;

        const observables = this.notations.map(critere => {
            if (critere.id) {

                console.log("Notation ...." , critere.valeur)
                return this.notationService.update(critere.id, critere);
            } else {
                return this.notationService.create({
                    ...critere,
                    candidatId: this.candidat()!.id
                });
            }
        });


        forkJoin(observables).subscribe({
            next: () => {
                this.modeEdit = false;
                this.submit.emit(true);
            },
            error: (err) => {
                console.error('Erreur lors de la mise à jour des notations:', err);
            }
        });
    }

}

