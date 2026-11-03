import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  readdocumentss() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  //  Add funding to project
  addDocumentTypes(document: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}documentTypes`, document);
  }


  //read all document
  readDocumentOfProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      return this.http.get<any>(
        `${environment.baseUrl}documentTypes?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}documentTypes?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
  // update a document
  updatedocument(documentTypesId:number, document:any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}documentTypes/${documentTypesId}`, document, {
      observe: 'response',
    });
  }
  //delete a DocumentType
  deleteDocumentType(documentTypeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}documentTypes/${documentTypeId}`, {
      observe: 'response',
    });
  }
}
