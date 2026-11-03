import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface FinancialReportResponse {
  annee: number;
  periodType: string;
  recettesFonctionnement: BudgetReportRow[];
  depensesFonctionnement: BudgetReportRow[];
  investissements: BudgetReportRow[];
  recapInvestissement: BudgetReportRow[];
  engagements: Engagement[];
}

export interface BudgetReportRow {
  classe?: string;
  compte?: string;
  sousCompte?: string;
  rubrique?: string;
  isCategory?: boolean;
  isSubCategory?: boolean;
  isTotal?: boolean;
  isTitle?: boolean;
  budgetInitial: number;
  budgetModifie: number;
  realisationsPeriodiques?: { [key: string]: number };
  realisationsAu31032024?: number;
  realisationsCumulees?: number;
  tauxExecution?: number;
  niveauExecution?: number;
  resteARealiser?: number;
  t1?: number;
  t2?: number;
  t3?: number;
  t4?: number;
  // Propriétés pour les périodes mensuelles
  janvier?: number;
  fevrier?: number;
  mars?: number;
  avril?: number;
  mai?: number;
  juin?: number;
  juillet?: number;
  aout?: number;
  septembre?: number;
  octobre?: number;
  novembre?: number;
  decembre?: number;
}

export interface Engagement {
  numBon?: string;
  dateEngagement?: string;
  numBE?: string;
  numMandat?: string;
  factureEtat?: string;
  montants?: number;
  fournisseurBeneficiaire?: string;
  servicesDGPSN?: string;
  compte?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {

  constructor(protected http: HttpClient) { }

  /**
   * Génère le rapport financier complet
   * @param annee Année du rapport
   * @param periodType Type de période (mensuel, trimestriel, annuel)
   * @param budgetId ID du budget
   */
  generateFinancialReport(annee: number, periodType: string, budgetId: number): Observable<FinancialReportResponse> {
    let params = new HttpParams()
        .set('annee', annee.toString())
        .set('periodType', periodType)
        .set('budgetId', budgetId.toString());

    return this.http.get<FinancialReportResponse>(
        `${environment.baseUrl}reports/financement`,
        { params }
    );
  }

  /**
   * Génère uniquement les recettes de fonctionnement
   */
  generateRecettesFonctionnement(annee: number, periodType: string, budgetId: number): Observable<BudgetReportRow[]> {
    let params = new HttpParams()
        .set('annee', annee.toString())
        .set('periodType', periodType)
        .set('budgetId', budgetId.toString());

    return this.http.get<BudgetReportRow[]>(
        `${environment.baseUrl}reports/financement/recettes`,
        { params }
    );
  }

  /**
   * Génère uniquement les dépenses de fonctionnement
   */
  generateDepensesFonctionnement(annee: number, periodType: string, budgetId: number): Observable<BudgetReportRow[]> {
    let params = new HttpParams()
        .set('annee', annee.toString())
        .set('periodType', periodType)
        .set('budgetId', budgetId.toString());

    return this.http.get<BudgetReportRow[]>(
        `${environment.baseUrl}reports/financement/depenses`,
        { params }
    );
  }

  /**
   * Génère uniquement les investissements
   */
  generateInvestissements(annee: number, periodType: string, budgetId: number): Observable<BudgetReportRow[]> {
    let params = new HttpParams()
        .set('annee', annee.toString())
        .set('periodType', periodType)
        .set('budgetId', budgetId.toString());

    return this.http.get<BudgetReportRow[]>(
        `${environment.baseUrl}reports/financement/investissements`,
        { params }
    );
  }

  /**
   * Génère le récapitulatif des investissements
   */
  generateRecapitulatifInvestissement(annee: number, budgetId: number): Observable<BudgetReportRow[]> {
    let params = new HttpParams()
        .set('annee', annee.toString())
        .set('budgetId', budgetId.toString());

    return this.http.get<BudgetReportRow[]>(
        `${environment.baseUrl}reports/financement/recapitulatif`,
        { params }
    );
  }

  /**
   * Récupère les engagements
   */
  getEngagements(annee: number, budgetId: number): Observable<Engagement[]> {
    let params = new HttpParams()
        .set('annee', annee.toString())
        .set('budgetId', budgetId.toString());

    return this.http.get<Engagement[]>(
        `${environment.baseUrl}reports/financement/engagements`,
        { params }
    );
  }
}
