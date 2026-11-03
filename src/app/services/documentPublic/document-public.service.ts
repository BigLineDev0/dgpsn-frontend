import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentPublicService {

  constructor(private http: HttpClient) { }

  createDocument(document: any, file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('DocumentPublicDTO', JSON.stringify(document));
    formData.append('file', file);
    return this.http.post<any>(`${environment.baseUrl}documents-public`, formData);
  }

  updateDocument(documentId: any, document: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}documents-public/${documentId}`, document);
  }

  deleteDocument(documentId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}documents-public/${documentId}`);
  }

  readDocument(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
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
      if(req?.documentTypeId != undefined && req?.documentTypeId){
        parametres = parametres.append("documentTypeId", req?.documentTypeId);
      }
      if(req?.folderId != undefined && req?.folderId){
        parametres = parametres.append("folderId", req?.folderId);
      }
      if(req?.partnerIds != undefined && req?.partnerIds){
        parametres = parametres.append("partnerIds", req?.partnerIds);
      }
      if(req?.sectorIds != undefined && req?.sectorIds){
        parametres = parametres.append("sectorIds", req?.sectorIds);
      }
      if(req?.publish != undefined && req?.publish){
        parametres = parametres.append("publish", req?.publish);
      }
      return this.http.get<any>(
        `${environment.baseUrl}documents-public?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}documents-public?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  readPublishDocument(req: any): Observable<any> {
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
      `${environment.baseUrl}documents-public/publishedDocuments?page=${req?.page}&size=${req?.size}`,{
        params: parametres
      }
    );
  }

  readFile(id: any): Observable<any> {
    return this.http
    .get(
      `${environment.baseUrl}documents-public/${id}/_download`,
      {
        responseType: 'blob'
      }
    );
  }

  publishUnpublishDocument(documentId: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}documents-public/publishUnpublish/${documentId}`, null);
  }

}
