import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueService {

  private apiUrl = `${environment.baseUrl}caracteristiqueRecrutements`;

  constructor(private http: HttpClient) { }

  /**
   * Lire toutes les caractéristiques avec pagination
   */
  readCaracteristique(params: any): Observable<any> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    
    return this.http.get<any>(this.apiUrl, { params: httpParams });
  }

  /**
   * Lire les caractéristiques par type
   */
  readCaracteristiqueByType(typeId: any, params: any): Observable<any> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    
    return this.http.get<any>(`${this.apiUrl}/caracteristiqueRecrutementId/${typeId}`, { params: httpParams });
  }

  /**
   * Créer une nouvelle caractéristique
   */
  createCaracteristique(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  /**
   * Mettre à jour une caractéristique existante
   */
  updateCaracteristique(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Supprimer une caractéristique
   */
  deleteCaracteristique(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtenir une caractéristique par son ID
   */
  getCaracteristiqueById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Rechercher des caractéristiques
   */
  searchCaracteristiques(searchParams: any): Observable<any> {
    let httpParams = new HttpParams();
    
    if (searchParams) {
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== null && searchParams[key] !== undefined && searchParams[key] !== '') {
          httpParams = httpParams.set(key, searchParams[key].toString());
        }
      });
    }
    
    return this.http.get<any>(`${this.apiUrl}/search`, { params: httpParams });
  }
}