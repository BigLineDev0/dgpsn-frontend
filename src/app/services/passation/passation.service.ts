import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassationService {
  constructor(protected http: HttpClient) { }

  // Create Passation
  createPassation(passation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}passation`, passation);
  }

  // Update Passation
  updatePassation(passationId: any, passation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}passation/${passationId}`, passation, {
      observe: 'response',
    });
  }

  // Read all Passations
  readPassations(req: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if (req) {
      parametres = this.buildParameters(req);
      return this.http.get<any>(
        `${environment.baseUrl}passation/allPassations?page=${req.page}&size=${req.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}passation/allPassations?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  // Read a Passation
  readPassation(passationId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}passation/${passationId}`);
  }

  // Delete Passation
  deletePassation(passationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}passation/${passationId}`, {
      observe: 'response',
    });
  }

  buildParameters(req?: any): HttpParams {
    let parametres: HttpParams = new HttpParams();
    if (req) {
      if (req?.reference != undefined && req?.reference) {
        parametres = parametres.append("reference", req?.reference);
      }
       if (req?.realisation != undefined && req?.realisation) {
        parametres = parametres.append("realisation", req?.realisation);
      }
       if (req?.sourceFinancementId != undefined && req?.sourceFinancementId) {
        parametres = parametres.append("sourceFinancementId", req?.sourceFinancementId);
      }
       if (req?.typeMarcheId != undefined && req?.typeMarcheId) {
        parametres = parametres.append("typeMarcheId", req?.typeMarcheId);
      }
      if (req?.modePassationId != undefined && req?.modePassationId) {
        parametres = parametres.append("modePassationId", req?.modePassationId);
      }
      if (req?.montant != undefined && req?.montant) {
        parametres = parametres.append("montant", req?.montant);
      }
      if (req?.dateLancement != undefined && req?.dateLancement) {
        parametres = parametres.append("dateLancement", req?.dateLancement);
      }
      if (req?.dateAttribution != undefined && req?.dateAttribution) {
        parametres = parametres.append("dateAttribution", req?.dateAttribution);
      }
      if (req?.dateDemarrage != undefined && req?.dateDemarrage) {
        parametres = parametres.append("dateDemarrage", req?.dateDemarrage);
      }
    }
    return parametres;
  }
}