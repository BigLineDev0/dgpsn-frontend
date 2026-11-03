// src/app/services/conge-export.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongeExportService {

  constructor(private http: HttpClient) { }

  /**
   * Export Excel avec Observable pour gérer le loading
   */
  exportExcel(annee?: number): Observable<Blob> {
    let params = new HttpParams();
    if (annee) {
      params = params.set('annee', annee.toString());
    }

    return this.http.get(`${environment.baseUrl}conges/export/excel`, {
      params,
      responseType: 'blob'
    }).pipe(
      tap((blob: Blob) => {
        const filename = this.generateFilename('xlsx', annee);
        saveAs(blob, filename);
      })
    );
  }

  /**
   * Export CSV avec Observable pour gérer le loading
   */
  exportCSV(annee?: number): Observable<Blob> {
    let params = new HttpParams();
    if (annee) {
      params = params.set('annee', annee.toString());
    }

    return this.http.get(`${environment.baseUrl}conges/export/csv`, {
      params,
      responseType: 'blob'
    }).pipe(
      tap((blob: Blob) => {
        const filename = this.generateFilename('csv', annee);
        saveAs(blob, filename);
      })
    );
  }

  /**
   * Génère le nom du fichier avec année et timestamp
   */
  private generateFilename(extension: string, annee?: number): string {
    const year = annee || new Date().getFullYear();
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 16).replace(/[-:T]/g, '');
    return `conges_agents_${year}_${timestamp}.${extension}`;
  }
}