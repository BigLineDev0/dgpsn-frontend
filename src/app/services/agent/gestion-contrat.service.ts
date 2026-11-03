import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionContratService {
  private baseUrl = `${environment.baseUrl}agents`;
  private http = inject(HttpClient);

  /**
   * Récupérer tous les contrats d'un agent
   */
  getContratsByAgent(agentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${agentId}/gestion-contrats`);
  }

  /**
   * Créer un contrat pour un agent
   */
  createContrat(agentId: number, contrat: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${agentId}/gestion-contrats`, contrat);
  }

  /**
   * Mettre à jour un contrat
   */
  updateContrat(agentId: number, contratId: number, contrat: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${agentId}/gestion-contrats/${contratId}`, contrat);
  }

  /**
   * Supprimer un contrat
   */
  deleteContrat(agentId: number, contratId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${agentId}/gestion-contrats/${contratId}`);
  }

  /**
   * Mettre à jour le statut actif/inactif d’un contrat
   */
  updateStatusContrat(agentId: number, contratId: number, isActive: boolean): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/${agentId}/gestion-contrats/${contratId}/status?isActive=${isActive}`,
      null
    );
  }

  /**
   * Rechercher des contrats avec des critères
   */
  searchContrats(agentId: number, criteria: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${agentId}/gestion-contrats/search`, {
      params: criteria,
    });
  }
}