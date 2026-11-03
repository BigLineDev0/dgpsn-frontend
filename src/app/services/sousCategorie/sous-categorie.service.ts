import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  constructor(protected http: HttpClient) { }

  //  create SousCategorie
  createSousCategorie(sousCategorie: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}subCategories`,sousCategorie);
  }

  // update a SousCategorie
  updateSousCategorie(sousCategorieId : any, sousCategorie: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}subCategories/${sousCategorieId}`, sousCategorie, {
      observe: 'response',
    });
  }

   // get a SousCategorie
   readSousCategories(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}subCategories/${id}`, {
      observe: 'response',
    });
  }

  //read all SousCategories
  readSCategories(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.categoryId != undefined && req?.categoryId){
        parametres = parametres.append("categoryId",req?.categoryId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}subCategories?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}subCategories?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a SousCategorie
  deleteSousCategories(specificSousCategorieId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}subCategories/${specificSousCategorieId}`, {
      observe: 'response',
    });
  }
}
