import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(protected http: HttpClient) { }

  //  create projet
  createProjet(projet: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}projet`, projet);
  }

  // update a projet
  updateProjet(projetId : any, projet: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}projet/${projetId}`, projet, {
      observe: 'response',
    });
  }

  // get a projet
  readProjet(projetId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}projet/${projetId}`, {
      observe: 'response',
    });
  }

  //  create projet
  ulpoadImage(projetId: any, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.put<any>(`${environment.baseUrl}projet/upload-image/${projetId}`, formData, {
      observe: 'response'
    });
  }

  //read all projets
  readProjets(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req.sigle !== undefined && req.sigle !== null){
        parametres = parametres.append("sigle", req?.sigle);
      }
      if(req.libelle !== undefined && req.libelle !== null){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req.dateDebut !== undefined && req.dateDebut !== null){
        parametres = parametres.append("dateDebut", req?.dateDebut);
      }
      if(req.dateFin !== undefined && req.dateFin !== null){
        parametres = parametres.append("dateFin", req?.dateFin);
      }
      if(req.type !== undefined && req.type !== null){
        parametres = parametres.append("type", req?.type);
      }
      if(req.equivalence !== undefined && req.equivalence !== null){
        parametres = parametres.append("budget", req?.equivalence);
      }
      if(req.structureId !== undefined && req.structureId !== null){
        parametres = parametres.append("structureId", req?.structureId);
      }
      if(req.subSectorId !== undefined && req.subSectorId !== null){
        parametres = parametres.append("subSectorId", req?.subSectorId);
      }
      if(req.zoneExecutionId !== undefined && req.zoneExecutionId !== null){
        parametres = parametres.append("zoneExecutionId", req?.zoneExecutionId);
      }
      if(req.statusId !== undefined && req.statusId !== null){
        parametres = parametres.append("statusId", req?.statusId);
      }
      if(req.axePSEId !== undefined && req.axePSEId !== null){
        parametres = parametres.append("axePSEId", req?.axePSEId);
      }
      if(req.tag !== undefined && req.tag !== null){
        parametres = parametres.append("tag", req?.tag);
      }
      if(req.publish !== undefined && req.publish !== null){
        parametres = parametres.append("publish", req?.publish);
      }
      return this.http.get<any>(
        `${environment.baseUrl}projet?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}projet?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a projet
  deletePropjet(projetId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}projet/${projetId}`, {
      observe: 'response',
    });
  }

  //get all type
  readAllTypeProjet(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}projet/readAllTypeProject`, {
      observe: 'response',
    });
  }

  //get all type
  readPublishedProjects(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}projet/publish`, {
      observe: 'response',
    });
  }

   //  Import project
   importProject(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.baseUrl}projet/import`, formData,{
      observe: 'response'
    })
  }


  //export to excel
  exportProjetToExcel() {

   return this.http.get('http://localhost:9090/siggi-api-v1/projet/export/excel', { responseType: 'blob' }).subscribe(
      (data) => {
        console.log("data",data)
        // const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(data);
        window.open(url);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'exportation CSV :', error);
      }
    );
  }
   //export to excel
   exportProjetToExcel1() {
  //  alert("ok")
    return this.http.get(`${environment.baseUrl}projet/export/excel`, {
      responseType: 'blob' as 'json'
    });
   }
 

  exportProjectPdf(): Observable <any> {
    return this.http
    .get(
      `${environment.baseUrl}projet/export/pdf`,
      {
        responseType: 'blob'
      }
    );
  }

  publishUnpublishProject(projetId: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}projet/publishUnpublish/${projetId}`, null);
  }

  readStatisticProject(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}projet/statistics`);
  }
}
