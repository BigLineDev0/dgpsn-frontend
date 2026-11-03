import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "@/environments/environment";

export interface NotationDTO {
    id?: number;
    critere?: string;
    valeur?: string;
    candidatId?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotationService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.baseUrl}notations`;

    //  Récupérer les notations d’un candidat
    getByCandidatId(candidatId: number): Observable<NotationDTO[]> {
        return this.http.get<NotationDTO[]>(`${this.baseUrl}/candidat/${candidatId}`);
    }

    create(notation: NotationDTO): Observable<NotationDTO> {
        return this.http.post<NotationDTO>(this.baseUrl, notation);
    }


    update(id: number, notation: NotationDTO): Observable<NotationDTO> {
        return this.http.put<NotationDTO>(`${this.baseUrl}/${id}`, notation);
    }


    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
