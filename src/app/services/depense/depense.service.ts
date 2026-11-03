import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  constructor(private http: HttpClient) { }

  createDepense(depense: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}depense`, depense);
  }

  updateDepense(depenseId: any, depense: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}depense/${depenseId}`, depense);
  }

  deleteDepense(depenseId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}depense/${depenseId}`);
  }

  readDepense(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projectId != undefined && req?.projectId){
        parametres = parametres.append("projectId", req?.projectId);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date", req?.date);
      }
      if(req?.unitAmount != undefined && req?.unitAmount){
        parametres = parametres.append("unitAmount", req?.unitAmount);
      }
      if(req?.quantity != undefined && req?.quantity){
        parametres = parametres.append("quantity", req?.quantity);
      }
      if(req?.totalAmount != undefined && req?.totalAmount){
        parametres = parametres.append("totalAmount", req?.totalAmount);
      }
      if(req?.categorieDepenseId != undefined && req?.categorieDepenseId){
        parametres = parametres.append("categorieDepenseId", req?.categorieDepenseId);
      }
      if(req?.typeDepenseId != undefined && req?.typeDepenseId){
        parametres = parametres.append("typeDepenseId", req?.typeDepenseId);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
    
      return this.http.get<any>(
        `${environment.baseUrl}depense?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}depense?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  readPublishDepense(req: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if(req?.titre != undefined && req?.titre){
      parametres = parametres.append("titre", req?.titre);
    }
    if(req?.themes != undefined && req?.themes){
      parametres = parametres.append("themes", req?.themes);
    }
    if(req?.authors != undefined && req?.authors){
      parametres = parametres.append("authors", req?.authors);
    }
    if(req?.date != undefined && req?.date){
      parametres = parametres.append("date", req?.date);
    }
    if(req?.documentType != undefined && req?.documentType){
      parametres = parametres.append("documentType", req?.documentType);
    }
    if(req?.partner != undefined && req?.partner){
      parametres = parametres.append("partner", req?.partner);
    }
    if(req?.sector != undefined && req?.sector){
      parametres = parametres.append("sector", req?.sector);
    }
    return this.http.get<any>(
      `${environment.baseUrl}documents-public/publishedDepenses?page=${req?.page}&size=${req?.size}`,{
        params: parametres
      }
    );
  }

 

}
