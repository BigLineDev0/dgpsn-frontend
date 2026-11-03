import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  readdocumentss() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  //  Add funding to project
  addDocumentToProject(document: any, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('DocumentDTO', JSON.stringify(document));
    if(file){
      formData.append('file', file[0]);
    }
    return this.http.post<any>(`${environment.baseUrl}documents`, formData);
  }

  //  Add funding to project
  updateDocumentToProject(documentId: any, document: any, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('DocumentDTO', JSON.stringify(document));
    if(file){
      formData.append('file', file[0], file.name);
    }
    return this.http.put<any>(`${environment.baseUrl}documents/${documentId}`, formData);
  }

  //  Add funding to project
  deleteDocumentToProject(documentId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}documents/${documentId}`);
  }

  //r ead all document
  readDocumentOfProjects(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.projetId != undefined && req?.projetId){
        parametres = parametres.append("projetId", req?.projetId);
      }
      
      if(req?.entrepriseId != undefined && req?.entrepriseId){
        parametres = parametres.append("entrepriseId", req?.entrepriseId);
      }

      if(req?.managementUnitId != undefined && req?.managementUnitId){
        parametres = parametres.append("managementUnitId", req?.managementUnitId);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.author != undefined && req?.author){
        parametres = parametres.append("author", req?.author);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date", req?.date);
      }
      if(req?.documentTypeId != undefined && req?.documentTypeId){
        parametres = parametres.append("documentTypeId", req?.documentTypeId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}documents?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}documents?page=${0}&size=${100000}`,{
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

  // readFile(id: any){
  //   return this.http.get<any>(`${environment.baseUrl}documents/${id}`, {
  //     observe: 'response',
  //   });
  // }

  readFile(id: any): Observable <any>{
    return this.http
    .get(
      `${environment.baseUrl}documents/${id}/_download`,
      {

        responseType: 'blob'
      }
    );
  }
}
