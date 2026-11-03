import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "@/environments/environment";

// Interfaces pour les données
export interface RealisationExportDTO {
  libelle: string;
  budget: number;
  servicesVotees: number;
  realisationT1: number;
  realisationT2: number;
  realisationT3?: number;
  realisationT4?: number;
  tauxRealisationT1?: number;
  tauxRealisationT2?: number;
  tauxRealisationT3?: number;
  tauxRealisationT4?: number;
  tauxRealisationGlobal: number;
  ecart: number;
  observations: string;
  isTotal: boolean;
}

export interface RecetteData {
  libelle: string;
  budget: number;
  servicesVotees: number;
  realisationT1: number;
  realisationT2: number;
  tauxRealisation: number;
  ecart: number;
  observations: string;
  isTotal: boolean;
  annee: number;
  trimestre: string;
}

export interface DepenseData {
  libelle: string;
  budget: number;
  servicesVotees: number;
  realisationT1: number;
  realisationT2: number;
  realisationT3: number;
  tauxT1: number;
  tauxT2: number;
  tauxT3: number;
  ecart: number;
  observations: string;
  isTotal: boolean;
  annee: number;
  trimestre: string;
}

@Injectable({
  providedIn: 'root'
})
export class RapportControleService {
  // private readonly API_BASE_URL = 'http://localhost:2015/dgpsn-api';
  private readonly API_BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère les données de recettes depuis le backend
   */
  getRecettesData(annee: string, trimestre: string, typePeriode: string): Observable<RecetteData[]> {
    const params = new URLSearchParams({
      annee: annee,
      trimestre: trimestre,
      typePeriode: typePeriode
    });

    const url = `${this.API_BASE_URL}realisation/export/recettes/preview?${params.toString()}`;

    return this.http.get<RealisationExportDTO[]>(url).pipe(
      map(data => {
        console.log('Recettes data from backend:', data);
        return data.map(item => ({
          libelle: item.libelle || '',
          budget: item.budget || 0,
          servicesVotees: item.budget || 0,
          realisationT1: item.realisationT1 || 0,
          realisationT2: item.realisationT2 || 0,
          tauxRealisation: item.tauxRealisationGlobal || 0,
          ecart: item.ecart || 0,
          observations: item.observations || '',
          isTotal: item.isTotal || false,
          annee: parseInt(annee),
          trimestre: trimestre
        }));
      })
    );
  }

  /**
   * Récupère les données de dépenses depuis le backend
   */
  getDepensesData(annee: string, trimestre: string, typePeriode: string): Observable<DepenseData[]> {
    const params = new URLSearchParams({
      annee: annee,
      trimestre: trimestre,
      typePeriode: typePeriode
    });

    const url = `${this.API_BASE_URL}realisation/export/depenses/preview?${params.toString()}`;

    return this.http.get<RealisationExportDTO[]>(url).pipe(
      map(data => {
        console.log('Dépenses data from backend:', data);
        return data.map(item => ({
          libelle: item.libelle || '',
          budget: item.budget || 0,
          servicesVotees: item.budget || 0,
          realisationT1: item.realisationT1 || 0,
          realisationT2: item.realisationT2 || 0,
          realisationT3: item.realisationT3 || 0,
          tauxT1: item.tauxRealisationT1 || 0,
          tauxT2: item.tauxRealisationT2 || 0,
          tauxT3: item.tauxRealisationT3 || 0,
          ecart: item.ecart || 0,
          observations: item.observations || '',
          isTotal: item.isTotal || false,
          annee: parseInt(annee),
          trimestre: trimestre
        }));
      })
    );
  }

  /**
   * Télécharge le fichier Excel des recettes
   */
  exportRecettesToExcel(annee: string, trimestre: string, typePeriode: string): Observable<Blob> {
    const params = new URLSearchParams({
      annee: annee,
      trimestre: trimestre,
      typePeriode: typePeriode
    });

    const url = `${this.API_BASE_URL}realisation/export/recettes?${params.toString()}`;

    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  /**
   * Télécharge le fichier Excel des dépenses
   */
  exportDepensesToExcel(annee: string, trimestre: string, typePeriode: string): Observable<Blob> {
    const params = new URLSearchParams({
      annee: annee,
      trimestre: trimestre,
      typePeriode: typePeriode
    });

    const url = `${this.API_BASE_URL}realisation/export/depenses?${params.toString()}`;

    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  /**
   * Utilitaire pour télécharger un blob en tant que fichier
   */
  downloadFile(blob: Blob, fileName: string): void {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}
