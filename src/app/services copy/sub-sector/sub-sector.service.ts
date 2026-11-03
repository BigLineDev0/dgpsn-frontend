import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubSectorService {

  constructor(protected http: HttpClient) { }

  //  create subSector
  createSubsector(SubSector: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}subSectors`, SubSector);
  }

  // update a subSector
  updateSubsector(subSectorId : any, SubSector: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}subSectors/${subSectorId}`, SubSector, {
      observe: 'response',
    });
  }

  //delete subSector
  deleteSubsector(subSectorId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}subSectors/${subSectorId}`, {
      observe: 'response',
    });
  }
  // get a subSector
  readSubsector(subSectorId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}subSectors/${subSectorId}`, {
      observe: 'response',
    });
  }

  //read all subSector
  readSubsectors(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.sectorId != undefined && req?.sectorId){
        parametres = parametres.append("sectorId", req?.sectorId);
      }
         return this.http.get<any>(
        `${environment.baseUrl}subSectors?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}subSectors?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
}
