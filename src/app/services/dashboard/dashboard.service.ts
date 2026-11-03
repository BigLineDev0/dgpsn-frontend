import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private apiUrl = `${environment.baseUrl}dashboard`;
  private http = inject(HttpClient);

  //   ==== AGENT ====
  /**
   * Récupère les statistiques pour les cards Agent
   */

  getStatsCardAgent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agent/card`);
  }
  /**
   * Récupère le nombre d'agents par direction
   */
  getCountAgentsByDirection(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/direction/agents`);
  }

  getAgentGrouping(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agent/groups`);
  }

  getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-conge`);
  }

getProjectionsRetraite(annee?: number): Observable<any[]> {
  const params = annee !== undefined ? `annee=${annee}` : '';
  return this.http.get<any[]>(`${this.apiUrl}/retraites-projections?${params}`);
}
}
