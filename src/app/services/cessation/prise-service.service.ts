import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriseServiceService {
  constructor(protected http: HttpClient) { }

  create(cessationFonction?: any): Observable<any> {
    cessationFonction.typeConge = 'CESSATION';
    return this.http.post<any>(`${environment.baseUrl}cessationFonction`, cessationFonction);
  }

  update( cessationFonctionId:any, cessationFonction: any): Observable<any> {
    cessationFonction.typeConge = 'CESSATION';
    return this.http.put<any>(`${environment.baseUrl}cessationFonction/${cessationFonctionId}`, cessationFonction, {
      observe: 'response',
    });
  }

  read(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}cessationFonction/${id}`, {
      observe: 'response',
    });
  }

  getSoldeAnnuel(congeId: number): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}cessationFonction/${congeId}/solde`);
  }
  
  getSoldeTotalConge(congeId: number): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}cessationFonction/duree/${congeId}`, {
    
    });
  }

//   traiterSoldeRestantManuellement(): Observable<string> {
//     return this.http.post<any>(`${environment.baseUrl}cessationFonction/traiter-solde-restant`, {});
//  }
traiterSoldeRestantManuellement(annee: number): Observable<string> {
  return this.http.post<any>(`${environment.baseUrl}cessationFonction/traiter-solde-restant`, {}, {
      params: { annee: annee }
  });
}

  readAll(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("typeConge", 'CESSATION');
    if(req){
      if(req?.description){
        parametres = parametres.append("description",req?.description);
      }
      if(req?.congeId){
        parametres = parametres.append("congeId",req?.congeId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      
      return this.http.get<any>(
        `${environment.baseUrl}cessationFonction/page?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}cessationFonction/page?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  delete(cessationFonctionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}cessationFonction/${cessationFonctionId}`, {
      observe: 'response',
    });
  }
}
