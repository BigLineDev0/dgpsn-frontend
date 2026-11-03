import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {

  constructor(protected http: HttpClient) { }
  // create OrdreMission
   createOrdreMission( family?: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}ordreMission`, family);
  }

  createOrdreMissionDocument(docOrdreId?: any,  file?: any,document?: any,): Observable<any> {

    // if (document != undefined && file != undefined) {
      let formData: FormData = new FormData();
      // formData.append('familyDTO',family)
      formData.append('DocumentDTO', JSON.stringify(document));
     // formData.append('familyId', JSON.stringify(familyId));
      if (file) {
        formData.append('file', file[0]);
      }
      //return this.http.post<any>(`${environment.baseUrl}documents`, formData);
      return this.http.post<any>(`${environment.baseUrl}ordreMission/docOrdre/${docOrdreId}`, formData);
     // return this.http.post<any>(`${environment.baseUrl}family/docFamily`, formData);
    // } else {
    //   return this.http.post<any>(`${environment.baseUrl}family`, family);

    // }
  }



  // update a OrdreMission
  updateOrdreMission(ordreMissionId: any, agent: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}ordreMission/${ordreMissionId}`, agent, {
      observe: 'response',
    });
  }

  // get a OrdreMission
  readOrdreMission(req: any): Observable<any> {
    
    let parametres: HttpParams = new HttpParams();
    if(req){
      if (req?.ordreMissionId != undefined && req?.ordreMissionId) {
        parametres = parametres.append("ordreMissionId", req?.ordreMissionId);
      }
    }
    return this.http.get<any>(`${environment.baseUrl}ordreMission?ordreMissionId=${req}`, {
      params: parametres,
    });
  }

   // get a OrdreMission with idAgent ant idOrdreMission
   readOrdreMissionWithIdAgent(req: any): Observable<any> {
    
    let parametres: HttpParams = new HttpParams();
    if(req){
      if (req?.ordreMissionId != undefined && req?.ordreMissionId) {
        parametres = parametres.append("ordreMissionId", req?.ordreMissionId);
      }
      if (req?.agentId != undefined && req?.agentId) {
        parametres = parametres.append("agentId", req?.agentId);
      }
    }
    return this.http.get<any>(`${environment.baseUrl}ordreMission?ordreMissionId=${req.ordreMissionId}&agentId=${req.agentId}`, {
      params: parametres,
    });
  }

  ChangeStatutOrdreMission(ordreMissionId:any,req?: any): Observable<any> {
    
    let parametres: HttpParams = new HttpParams();
    if(req){
     
      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append("statut", req?.statut);
      }

      return this.http.put<any>(`${environment.baseUrl}ordreMission/status/${ordreMissionId}`,null, {
        params: parametres,
      });
    }else{
      return this.http.put<any>(`${environment.baseUrl}ordreMission/status/${ordreMissionId}`, {
        params: parametres,
      });
    }
   
  }

  //read all OrdreMission
  readOrdreMissions(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if (req) {
      if (req?.prenom != undefined && req?.prenom) {
        parametres = parametres.append("prenom", req?.prenom);
      }
      if (req?.nom != undefined && req?.nom) {
        parametres = parametres.append("nom", req?.nom);
      }
      if (req?.placeOfBorn != undefined && req?.placeOfBorn) {
        parametres = parametres.append("placeOfBorn", req?.placeOfBorn);
      }
      if (req?.sex != undefined && req?.sex) {
        parametres = parametres.append("sex", req?.sex);
      }
      if (req?.linkFamily != undefined && req?.linkFamily) {
        parametres = parametres.append("linkFamily", req?.linkFamily);
      }

      if (req?.ordreMissionId != undefined && req?.ordreMissionId) {
        parametres = parametres.append("ordreMissionId", req?.ordreMissionId);
      }

      if (req?.agentId != undefined && req?.agentId) {
        parametres = parametres.append("agentId", req?.agentId);
      }
     

      if (req?.sortBy != undefined && req?.sortBy) {
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if (req?.ascending != undefined && req?.ascending) {
        parametres = parametres.append("ascending", req?.ascending);
      }
      return this.http.get<any>(
        `${environment.baseUrl}ordreMission?page=${req?.page}&size=${req?.size}`, {
        params: parametres
      }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}ordreMission?page=${0}&size=${100000}`, {
        params: parametres
      }
      );
    }

  }

  //delete a OrdreMission
  deleteOrdreMission(ordreMissionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}ordreMission/${ordreMissionId}`, {
      observe: 'response',
    });
  }

    //delete a Famille
    deleteDocumentOrdreMission(familyId: any): Observable<any> {
      return this.http.delete<any>(`${environment.baseUrl}ordreMission/doc/${familyId}`, {
        observe: 'response',
      });
    }
}
