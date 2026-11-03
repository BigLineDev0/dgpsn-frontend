import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({ providedIn: 'root' })
export class BudgetDashboardService {

    private baseUrl = `${environment.baseUrl}dashboard/budget/`;

    constructor(protected http: HttpClient) { }

    getBudgetSummaryKpis(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}kpis`);
    }

    getBudgetDistributionByYear(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}distribution-by-year`);
    }

    getTop5BudgetsByAmount(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}top5-by-amount`);
    }

    getTop5BudgetExecutionRates(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}top5-by-execution`);
    }

    getMonthlyConsumptionEvolution(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}monthly-consumption`);
    }
}