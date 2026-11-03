import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ManangementUnitService {

  constructor(protected http: HttpClient) { }

  readProjet(projetId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}management-unit/${projetId}`, {
      observe: 'response',
    });
  }

  readProgramme(programmeId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}management-unit/${programmeId}`, {
      observe: 'response',
    });
  }

  readAllProgrammes(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    // parametres = parametres.append("type", 'PROGRAMME');


    if (req) {
      if (req?.type != undefined && req?.type) {
        parametres =  parametres.append("type", req?.type);
      }
      if (req?.code != undefined && req?.code) {
        parametres = parametres.append("code", req?.code);
      }
      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      if(req?.dateDebut != undefined && req?.dateDebut){
        parametres = parametres.append("dateDebut", req?.dateDebut);
      }
      if(req?.dateFin != undefined && req?.dateFin){
        parametres = parametres.append("dateFin", req?.dateFin);
      }
      if(req?.budget != undefined && req?.budget){
        parametres = parametres.append("budget", req?.budget);
      }
      if(req?.poids != undefined && req?.poids){
        parametres = parametres.append("poids", req?.poids);
      }
      if(req?.responsibleId != undefined && req?.responsibleId){
        parametres = parametres.append("responsibleId", req?.responsibleId);
      }
      if(req?.tag != undefined && req?.tag){
        parametres = parametres.append("tag", req?.tag);
      }
      if(req?.axePse != undefined && req?.axePse){
        parametres = parametres.append("axePse", req?.axePse);
      }
      if(req?.parentId != undefined && req?.parentId){
        parametres = parametres.append("parentId", req?.parentId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  createProgramme(programme: any): Observable<any> {
    programme.type = 'PROGRAMME';
    return this.http.post<any>(`${environment.baseUrl}management-unit`, programme);
  }

  updateProgramme( programmeId:any, programme: any): Observable<any> {
    programme.type = 'PROGRAMME';
    return this.http.put<any>(`${environment.baseUrl}management-unit/${programmeId}`, programme, {
      observe: 'response',
    });
  }

  deleteProgramme(programmeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}management-unit/${programmeId}`, {
      observe: 'response',
    });
  }

  exportProgrammeToExcel() {
    return this.http.get(`${environment.baseUrl}management-unit/export/excel`,{
      responseType: 'blob' as 'json'
    });
  }


  exportProgrammePdf(): Observable <any> {
    return this.http.get(`${environment.baseUrl}management-unit/export/pdf`,{
          responseType: 'blob'
        }
      );
  }
   // get a Management Unit
   readManagementUnit(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}management-unit/${id}`, {
      observe: 'response',
    });
  }


  ////////////// START CRUD FOR ACTIVITY SERVICE /////////////////////////////

  createActivity(activity: any): Observable<any> {
    activity.type = 'ACTIVITY';
    return this.http.post<any>(`${environment.baseUrl}management-unit`, activity);
  }

  updateActivity( activityId:any, activity: any): Observable<any> {
    activity.type = 'ACTIVITY';
    return this.http.put<any>(`${environment.baseUrl}management-unit/${activityId}`, activity, {
      observe: 'response',
    });
  }

  deleteActivity(activityId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}management-unit/${activityId}`, {
      observe: 'response',
    });
  }

  readAllActivity(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("type", 'ACTIVITY');

    if (req) {

      if(req?.parentId != undefined ){
        parametres = parametres.append("parentId",req?.parentId);
      }
      if (req?.code != undefined && req?.code) {
        parametres = parametres.append("code", req?.code);
      }
      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      if(req?.expectedStartDate != undefined && req?.expectedStartDate){
        parametres = parametres.append("expectedStartDate", req?.expectedStartDate);
      }
      if(req?.expectedEndDate != undefined && req?.expectedEndDate){
        parametres = parametres.append("expectedEndDate", req?.expectedEndDate);
      }
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${0}&size=${100000}`, {
          params: parametres
        }
      );

    }
  }

   ////////////// END CRUD FOR ACTIVITY SERVICE /////////////////////////////

  importProgramme(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.baseUrl}management-unit/import`, formData,{
      observe: 'response'
    })
  }
  readAllProjets(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("type", 'PROJECT');

    if (req) {
      if (req?.code != undefined && req?.code) {
        parametres = parametres.append("code", req?.code);
      }
      if (req?.parentId != undefined && req?.parentId) {
        parametres = parametres.append("parentId", req?.parentId);
      }

      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      if(req?.dateDebut != undefined && req?.dateDebut){
        parametres = parametres.append("dateDebut", req?.dateDebut);
      }
      if(req?.dateFin != undefined && req?.dateFin){
        parametres = parametres.append("dateFin", req?.dateFin);

      }
      if(req?.budget != undefined && req?.budget){
        parametres = parametres.append("budget", req?.budget);
      }
      if(req?.poids != undefined && req?.poids){
        parametres = parametres.append("poids", req?.poids);
      }
      if(req?.responsibleId != undefined && req?.responsibleId){
        parametres = parametres.append("responsibleId", req?.responsibleId);
      }
      if(req?.tag != undefined && req?.tag){
        parametres = parametres.append("tag", req?.tag);
      }
      if(req?.axePse != undefined && req?.axePse){
        parametres = parametres.append("axePse", req?.axePse);
      }
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  readAllProducts(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("type", 'PRODUCT');

    if (req) {
      if (req?.code != undefined && req?.code) {
        parametres = parametres.append("code", req?.code);
      }
      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      if(req?.dateDebut != undefined && req?.dateDebut){
        parametres = parametres.append("dateDebut", req?.dateDebut);
      }
      if(req?.dateFin != undefined && req?.dateFin){
        parametres = parametres.append("dateFin", req?.dateFin);

      }
      if(req?.budget != undefined && req?.budget){
        parametres = parametres.append("budget", req?.budget);
      }
      if(req?.poids != undefined && req?.poids){
        parametres = parametres.append("poids", req?.poids);
      }
      if(req?.responsibleId != undefined && req?.responsibleId){
        parametres = parametres.append("responsibleId", req?.responsibleId);
      }
      if(req?.tag != undefined && req?.tag){
        parametres = parametres.append("tag", req?.tag);
      }
      if(req?.axePse != undefined && req?.axePse){
        parametres = parametres.append("axePse", req?.axePse);
      }
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}management-unit?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }


  createProjet(programme: any): Observable<any> {
    programme.type = 'PROJECT';
    return this.http.post<any>(`${environment.baseUrl}management-unit`, programme);
  }

  updateProjet(programmeId:any, programme: any): Observable<any> {
    programme.type = 'PROJECT';
    return this.http.put<any>(`${environment.baseUrl}management-unit/${programmeId}`, programme, {
      observe: 'response',
    });
  }

  deleteProjet(programmeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}management-unit/${programmeId}`, {
      observe: 'response',
    });
  }

  exportProjetsToExcel() {
    return this.http.get(`${environment.baseUrl}management-unit/exportProjets/excel`,{
      responseType: 'blob' as 'json'
    });
  }


  exportProjetsPdf(): Observable <any> {
    return this.http.get(`${environment.baseUrl}management-unit/export/pdf`,{
          responseType: 'blob'
        }
      );
  }

  importProjet(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.baseUrl}management-unit/import`, formData,{
      observe: 'response'
    })
  }

  publishUnpublishProject(projetId: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}management-unit/publishUnpublish/${projetId}`, null);
  }

  ulpoadImage(projetId: any, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.put<any>(`${environment.baseUrl}management-unit/upload-image/${projetId}`, formData, {
      observe: 'response'
    });
  }
  readPublishedProjects(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}management-unit/publish`, {
      observe: 'response',
    });
  }

  readTreeManagementUnit(managementUnitId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}management-unit/tree/${managementUnitId}`, {
      observe: 'response',
    });
  }

  addNodeToTreeManagementUnit(parentId: any, node: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}management-unit/tree/add/${parentId}`, node, {
      observe: 'response',
    });
  }

  createNode(component: any, type: any): Observable<any> {
    component.type = type;
    return this.http.post<any>(`${environment.baseUrl}management-unit`, component);
  }

  readAllProjectsWithTree(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}management-unit/tree/all`, {
      observe: 'response',
    });
  }

}
