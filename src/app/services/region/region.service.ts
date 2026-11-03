import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  constructor(protected http: HttpClient) { }

  // Create region
  createRegion(region: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}regions`, region);
  }

  // Update region
  updateRegion(regionId: any, region: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}regions/${regionId}`, region, {
      observe: 'response',
    });
  }
  // Read all region
  readRegions(req: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  if(req){
    if(req?.code != undefined && req?.code){
      parametres = parametres.append("code",req?.code);
    }
    if(req?.libelle != undefined && req?.libelle){
      parametres = parametres.append("libelle",req?.libelle);
    }
    return this.http.get<any>(
     `${environment.baseUrl}regions?page=${req.page}&size=${req.size}`,{
     params: parametres
   });
  }
  else{
    return this.http.get<any>(
     `${environment.baseUrl}regions?page=${0}&size=${100000}`,{
       params: parametres
      });
    }
  }
  // Read a region
  readRegion(regionId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}regions/${regionId}`);
  }

  // Delete region
  deleteRegion(regionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}regions/${regionId}`, {
      observe: 'response',
    });
  }
  // Export region
  exportRegion() {
      return this.http.get(`${environment.baseUrl}regions/export`, {
       responseType: 'blob'
        });
  }
}
