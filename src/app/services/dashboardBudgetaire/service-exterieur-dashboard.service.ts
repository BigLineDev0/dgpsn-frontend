import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ServiceExterieurKpi {
  totalFormations: number;
  totalMissions: number;
  totalAteliers: number;
  totalBudget: number;
  totalParticipants: number;
}

export interface StatisticalDTO {
  label: string;
  value: number;
}

export interface StatisticalFundingDTO {
  label: string;
  value: number;
}

export interface MonthlyEvolution {
  month: string;
  formations: number;
  missions: number;
  ateliers: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceExterieurDashboardService {

  private baseUrl = `${environment.baseUrl}dashboard/service-exterieur`;

  constructor(private http: HttpClient) { }

  getKpis(): Observable<ServiceExterieurKpi> {
    return this.http.get<ServiceExterieurKpi>(`${this.baseUrl}/kpis`);
  }

  getActivitiesByType(): Observable<StatisticalDTO[]> {
    return this.http.get<StatisticalDTO[]>(`${this.baseUrl}/activities-by-type`);
  }

  getBudgetByActivityType(): Observable<StatisticalFundingDTO[]> {
    return this.http.get<StatisticalFundingDTO[]>(`${this.baseUrl}/budget-by-type`);
  }

  getMonthlyEvolution(): Observable<MonthlyEvolution[]> {
    return this.http.get<MonthlyEvolution[]>(`${this.baseUrl}/monthly-evolution`);
  }

  getActivitiesByStatus(): Observable<StatisticalDTO[]> {
    return this.http.get<StatisticalDTO[]>(`${this.baseUrl}/activities-by-status`);
  }

  getTop5ByBudget(): Observable<StatisticalFundingDTO[]> {
    return this.http.get<StatisticalFundingDTO[]>(`${this.baseUrl}/top5-by-budget`);
  }

  getParticipantsByType(): Observable<StatisticalDTO[]> {
    return this.http.get<StatisticalDTO[]>(`${this.baseUrl}/participants-by-type`);
  }
}