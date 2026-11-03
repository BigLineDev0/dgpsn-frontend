import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  constructor(protected http: HttpClient) { }

  //  create secteur
  createSecteur(secteur: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}sector`, secteur);
  }

  // update a secteur
  updateSecteur(secteurId : any, secteur: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}sector/${secteurId}`, secteur, {
      observe: 'response',
    });
  }

  // get a secteur
  readSecteur(secteurId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}sector/${secteurId}`, {
      observe: 'response',
    });
  }

  //read all secteur
  readSecteurs(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      return this.http.get<any>(
        `${environment.baseUrl}sector?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}sector?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
  //delete a Secteur
  deleteSecteurs(sectorId:number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}sector/${sectorId}`, {
      observe: 'response',
    });
  }
  importSecteur(file: any) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.baseUrl}sector/import`, formData, {
      observe: 'response'
    });
  }

  exportSecteur() {
    return this.http.get(`${environment.baseUrl}sector/export`, {
      responseType: 'blob'
    });
  }
}
