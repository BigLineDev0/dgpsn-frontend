import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  constructor(protected http: HttpClient) { }

  // Create departement
  createDepartement(departement: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}departements`, departement);
  }

  // Update departement
  updateDepartement(departementId: any, departement: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}departements/${departementId}`, departement, {
      observe: 'response',
    });
  }
  // Read all departement
  readDepartements(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    if(req?.regionId != undefined && req?.regionId){
      parametres = parametres.append("regionId",req?.regionId);
    }
    return this.http.get<any>(
     `${environment.baseUrl}departements?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}departements?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a departement
  readDepartement(departementId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}departements/${departementId}`);
  }

  // Delete departement
  deleteDepartement(departementId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}departements/${departementId}`, {
      observe: 'response',
    });
  }
  // Read By region
  readByRegion(regionId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}departements/region/${regionId}`);
}
  // Export departement
  exportDepartement() {
      return this.http.get(`${environment.baseUrl}departements/export`, {
       responseType: 'blob'
        });
  }
}
