import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  constructor(protected http: HttpClient) { }

  // Create recette
  createRecette(recette: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}recettes`, recette);
  }

  // Update recette
  updateRecette(recetteId: any, recette: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}recettes/${recetteId}`, recette, {
      observe: 'response',
    });
  }
  // Read all recette
  readRecettes(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    if(req?.montantdelarecette != undefined && req?.montantdelarecette){
      parametres = parametres.append("montantdelarecette",req?.montantdelarecette);
    }
    if(req?.datedelatransaction != undefined && req?.datedelatransaction){
      parametres = parametres.append("datedelatransaction",req?.datedelatransaction);
    }
    if(req?.description != undefined && req?.description){
      parametres = parametres.append("description",req?.description);
    }
    if(req?.naturedelarecette != undefined && req?.naturedelarecette){
      parametres = parametres.append("naturedelarecette",req?.naturedelarecette);
    }
    if(req?.entrepriseId != undefined && req?.entrepriseId){
      parametres = parametres.append("entrepriseId",req?.entrepriseId);
    }
    return this.http.get<any>(
     `${environment.baseUrl}recettes?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}recettes?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a recette
  readRecette(recetteId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}recettes/${recetteId}`);
  }

  // Delete recette
  deleteRecette(recetteId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}recettes/${recetteId}`, {
      observe: 'response',
    });
  }
  // Read By entreprise
  readByEntreprise(entrepriseId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}recettes/entreprise/${entrepriseId}`);
}
  // Export recette
  exportRecette() {
      return this.http.get(`${environment.baseUrl}recettes/export`, {
       responseType: 'blob'
        });
  }
}
