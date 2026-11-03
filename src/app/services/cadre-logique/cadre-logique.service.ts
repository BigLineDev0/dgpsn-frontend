import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CadreLogiqueService {

  constructor(protected http: HttpClient) { }

  //  create cadre logique
  createCadreLogique(cadreLogique: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}cadreLogique`, cadreLogique);
  }

  // update a cadre logique
  updateCadreLogique(cadreLogiqueId: any, cadreLogique: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}cadreLogique/${cadreLogiqueId}`, cadreLogique, {
      observe: 'response',
    });
  }

  // get a cadreLogique
  readCadreLogique(cadreLogiqueId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}cadreLogique/${cadreLogiqueId}`, {
      observe: 'response',
    });
  }


  //read all cadreLogique
  readCadreLogiques(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){

      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }

      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.regionId != undefined && req?.regionId){
        parametres = parametres.append("regionId", req?.regionId);
      }
      if(req?.departementId != undefined && req?.departementId){
        parametres = parametres.append("departementId", req?.departementId);
      }
      if(req?.arrondissementId != undefined && req?.arrondissementId){
        parametres = parametres.append("arrondissementId", req?.arrondissementId);
      }
     
      if(req?.codeType != undefined && req?.codeType){
        parametres = parametres.append("codeType", req?.codeType);
      }
      console.log("param ", parametres)
      return this.http.get<any>(
        `${environment.baseUrl}cadreLogique?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}cadreLogique?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
   //delete a cadrelogique
   deleteCadreLogique(cadreLogiqueId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}cadreLogique/${cadreLogiqueId}`)
   }

  // get  tree
  readTree(projectId?: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}cadreLogique/tree/${projectId}`, {
      observe: 'response',
    });
  }

  readRegions(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("projectId", req.projectId)
    return this.http.get<any>(
      `${environment.baseUrl}cadreLogique/regions?page=${0}&size=${100000}`,{
        params: parametres
      }
    );
 
  }

  readByParent(projectId: any,cadreLogiqueId?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("projectId", projectId)
    return this.http.get<any>(`${environment.baseUrl}cadreLogique/byParent/${cadreLogiqueId}`, {
      params: parametres,
    });
 
  }
}
