
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeographicalLocationService {

  constructor(protected http: HttpClient) { }

  //  create geographicalLocation
  creategeographicalLocation(geographicalLocation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}geographicalLocations`, geographicalLocation);
  }

 //  update reate geographicalLocation
 updategeographicalLocation(geographicalLocationId: any, geographicalLocations: any): Observable<any> {
  return this.http.put<any>(`${environment.baseUrl}geographicalLocations/${geographicalLocationId}`, geographicalLocations);
}
   // get a geographicalLocation
   readgeographicalLocation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}geographicalLocations/${id}`, {
      observe: 'response',
    });
  }

  //read all geographicalLocation
  readgeographicalLocations(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){

      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId",req?.projetId);
      }
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.cadreLogiqueId != undefined && req?.cadreLogiqueId){
        parametres = parametres.append("cadreLogiqueId",req?.cadreLogiqueId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}geographicalLocations?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}geographicalLocations?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a geographicalLocation
  deletegeographicalLocation(geographicalLocationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}geographicalLocations/${geographicalLocationId}`, {
      observe: 'response',
    });
  }

  readProjectsByRegion(regionId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}geographicalLocations/reportingByRegion/${regionId}`, {
      observe: 'response',
    });
  }

}
