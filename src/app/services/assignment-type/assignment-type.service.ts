import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentTypeService {

  constructor(protected http: HttpClient) { }

  //  create assignmentType
  createAssignmentType(assignmentType: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}assignmentTypes`, assignmentType);
  }

  // update a assignmentType
  updateAssignmentType(assignmentTypeId : any, assignmentType: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}assignmentTypes/${assignmentTypeId}`, assignmentType, {
      observe: 'response',
    });
  }

   // get a assignmentType
   readAssignmentType(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}assignmentTypes/${id}`, {
      observe: 'response',
    });
  }

  //read all assignmentTypes
  readAssignmentTypes(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      // if(req?.code){
      //   parametres = parametres.append("deadline",req?.deadline);
      // }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code",req?.code);
      }
      return this.http.get<any>(
        `${environment.baseUrl}assignmentTypes?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}assignmentTypes?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  //delete a assignmentType
  deleteAssignmentType(assignmentTypeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}assignmentTypes/${assignmentTypeId}`, {
      observe: 'response',
    });
  }
}
