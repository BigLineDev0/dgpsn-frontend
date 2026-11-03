import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriebudgetaireService {
  constructor(protected http: HttpClient) { }

  // Create categoriebudgetaire
  createCategoriebudgetaire(categoriebudgetaire: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}categoriebudgetaires`, categoriebudgetaire);
  }

  // Update categoriebudgetaire
  updateCategoriebudgetaire(categoriebudgetaireId: any, categoriebudgetaire: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}categoriebudgetaires/${categoriebudgetaireId}`, categoriebudgetaire, {
      observe: 'response',
    });
  }
  // Read all categoriebudgetaire
  readCategoriebudgetaires(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}categoriebudgetaires?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}categoriebudgetaires?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a categoriebudgetaire
  readCategoriebudgetaire(categoriebudgetaireId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}categoriebudgetaires/${categoriebudgetaireId}`);
  }

  // Delete categoriebudgetaire
  deleteCategoriebudgetaire(categoriebudgetaireId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}categoriebudgetaires/${categoriebudgetaireId}`, {
      observe: 'response',
    });
  }
  // Export categoriebudgetaire
  exportCategoriebudgetaire() {
      return this.http.get(`${environment.baseUrl}categoriebudgetaires/export`, {
       responseType: 'blob'
        });
  }
}
