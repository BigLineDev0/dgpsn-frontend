
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@/environments/environment';
import { CandidatDTO, StatusCandidature } from '@/app/models/candidat.model';

export interface  RecrutementInfos {
    id : number;
    libelle: string;
}

@Injectable({ providedIn: 'root' })
export class CandidatService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.baseUrl}recrutements`;

    private _candidats = signal<CandidatDTO[]>([]);
    private _loading = signal(false);
    private recrutementsInfos = signal<RecrutementInfos>({
        id : 0,
        libelle:''
    })

    recrutement = computed(() => this.recrutementsInfos())


    getInfosRecrutementInfosFromLocalStorage(){
        const id = localStorage.getItem('idRecrutement');
        console.log("IDDDD", id);
        const libelle = localStorage.getItem('libelleRecrutement');
        if(id && libelle && libelle !== ''){
            this.recrutementsInfos.set({
                id : Number(id),
                libelle : libelle
            })
        }

    }
    counts = computed(() => ({
        CAN: this.candidats().length,
        CAN_PRE_ENT: this.countByStatus(StatusCandidature.PRESELECTED_FOR_INTERVIEW)(),
        CAN_RET: this.countByStatus(StatusCandidature.SELECTED_AFTER_INTERVIEW)(),
        CAN_PRE_FINAL: this.countByStatus(StatusCandidature.ACCEPTED)(),
    }));

    getCount(type: 'CAN' | 'CAN_PRE_ENT' | 'CAN_RET' | 'CAN_PRE_FINAL') {
        return computed(() => this.counts()[type]);
    }
    // Expose les candidats
    candidats = this._candidats.asReadonly();
    loading = this._loading.asReadonly();

    // Filtre par statut
    candidatsByStatus = (status: StatusCandidature) =>
        computed(() => this._candidats().filter(c => c.statusCandidature === status));

    // Compte par statut
    countByStatus = (status: StatusCandidature) =>
        computed(() => this.candidatsByStatus(status)().length);

    // Charge tous les candidats
    loadCandidats(params: any = { page: 0, size: 20 }): void {
        this._loading.set(true);
        let httpParams = new HttpParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value != null && value !== '') {
                httpParams = httpParams.set(key, String(value));
            }
        });

        this.http.get<any>(`${this.baseUrl}/${this.recrutementsInfos().id}/candidats`, { params: httpParams }).subscribe({
            next: (res) => {
                console.log("REST PLAYLOAD", res);
                this._candidats.set(res.payload || res);
                this._loading.set(false);
            },
            error: (err) => {
                console.error('Erreur chargement candidats', err);
                this._loading.set(false);
            }
        });
    }


    saveCandidat(candidat: CandidatDTO): Observable<CandidatDTO> {
        return this.http.post<CandidatDTO>(`${this.baseUrl}/${this.recrutementsInfos().id}/candidats`, candidat).pipe(
            tap(() => this.loadCandidats())
        );
    }

    updateCandidat(id: number, updates: Partial<CandidatDTO>): Observable<CandidatDTO> {
        return this.http.put<CandidatDTO>(`${this.baseUrl}/${this.recrutementsInfos().id}/candidats/${id}`, updates).pipe(
            tap(() => this.loadCandidats())
        );
    }

    deleteCandidat(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
            tap(() => this.loadCandidats())
        );
    }
}