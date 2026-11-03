import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  constructor(protected http: HttpClient) { }

  // Create Tache
  createTache(tache: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}taches`, tache);
  }

  // Update a Tache
  updateTache(tacheId: any, tache: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}taches/${tacheId}`, tache);
  }

  // Update Tache Status
  updateTacheStatut(tacheId: any, statut: string): Observable<any> {
    const params = new HttpParams().set('statut', statut);
    return this.http.patch<any>(`${environment.baseUrl}taches/${tacheId}/statut`, null, { params });
  }

  // Get a Tache
  readTache(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}taches/${id}`);
  }

  // Read all Taches with pagination and filters
  readTaches(page?: any, map?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (map) {
      if (map?.trimestre !== undefined && map?.trimestre !== null) {
        parametres = parametres.append("trimestre", map.trimestre);
      }
      if (map?.mois !== undefined && map?.mois !== null) {
        parametres = parametres.append("mois", map.mois);
      }
      if (map?.statut !== undefined && map?.statut !== null) {
        parametres = parametres.append("statut", map.statut);
      }
      if (map?.commentaire !== undefined && map?.commentaire) {
        parametres = parametres.append("commentaire", map.commentaire);
      }
      if (map?.activiteId !== undefined && map?.activiteId !== null) {
        parametres = parametres.append("activiteId", map.activiteId);
      }
      if (map?.indicatorId !== undefined && map?.indicatorId !== null) {
        parametres = parametres.append("indicatorId", map.indicatorId);
      }
      if (map.managementUnitId !== undefined && map.managementUnitId !== null) {
        parametres = parametres.append("managementUnitId", map.managementUnitId);
      }
    }

    return this.http.get<any>(
        `${environment.baseUrl}taches?page=${page?.page}&size=${page?.size}`,
        { params: parametres }
    );
  }

  // Read Taches by Activite
  readTachesByActivite(activiteId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}taches/activite/${activiteId}`);
  }

  // Delete a Tache
  deleteTache(tacheId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}taches/${tacheId}`, {
      observe: 'response',
    });
  }

  // Export Taches to CSV
  exportTaches(): Observable<Blob> {
    return this.http.get(`${environment.baseUrl}taches/export`, {
      responseType: 'blob'
    });
  }
}
