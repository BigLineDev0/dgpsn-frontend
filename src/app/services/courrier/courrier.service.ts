import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import {environment} from "@/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CourrierService {
  // private apiUrl = "http://localhost:2015/dgpsn-api/courriers";
  private readonly apiUrl = environment.baseUrl + "courriers";

  constructor(private http: HttpClient) {}

  // Récupérer tous les courriers
  getAllCourriers(): Observable<any[]> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => response.content || response));
  }

  // Récupérer les courriers non archivés
  getCourriersNonArchives(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/non-archives`)
      .pipe(map((response) => response.content || response));
  }

  // Récupérer les courriers archivés
  getCourriersArchives(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/archives`)
      .pipe(map((response) => response.content || response));
  }

  // Récupérer un courrier par ID
  getCourrierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau courrier
  createCourrier(courrier: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, courrier);
  }

  // Mettre à jour un courrier
  updateCourrier(id: number, courrier: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, courrier);
  }

  // Supprimer un courrier
  deleteCourrier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Dans courrier.service.ts
updateCourrierStatut(courrierId: number, statut: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${courrierId}/statut`, { statut });
}

  // Archiver un courrier
  archiverCourrier(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/archiver`, {});
  }

  // Désarchiver un courrier
 // Dans courrier.service.ts
desarchiverCourrier(id: number): Observable<any> {
  console.log(`🔧 Appel désarchivage API: ${this.apiUrl}/${id}/desarchiver`);
  return this.http.put<any>(`${this.apiUrl}/${id}/desarchiver`, {}).pipe(
    tap((response: any) => {
      console.log('🔧 Réponse brute désarchivage:', response);
    }),
    catchError(error => {
      console.error('🔧 Erreur désarchivage:', error);
      return throwError(error);
    })
  );
}
}
